import { SPOTIFY_API_URL, SPOTIFY_AUTH_URL } from "@/constants";
import { generateCodeVerifier, generateCodeChallenge } from "@/helpers";
import { Instance, flow, types } from "mobx-state-tree";

const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || "";

export const authStoreInitialState = {
  codeChallenge: "",
  authorizationCode: null,
  accessToken: null,
};

export const authStore = types
  .model("AuthStore", {
    codeChallenge: types.string,
    authorizationCode: types.maybeNull(types.string),
    accessToken: types.maybeNull(types.string),
  })
  .actions((self) => ({
    /** Redirect to Spotify authorization page */
    redirectToAuthCodeFlow: flow(function* () {
      const verifier = generateCodeVerifier(128);
      self.codeChallenge = yield generateCodeChallenge(verifier);

      localStorage.setItem("verifier", verifier);

      const _params = new URLSearchParams();
      _params.append("client_id", SPOTIFY_CLIENT_ID);
      _params.append("response_type", "code");
      _params.append("redirect_uri", REDIRECT_URI);
      _params.append("scope", "user-read-private user-read-email");
      _params.append("code_challenge_method", "S256");
      _params.append("code_challenge", self.codeChallenge);

      window.location.replace(`${SPOTIFY_AUTH_URL}?${_params.toString()}`);
    }),

    fetchAccessToken: flow(function* () {
      const verifier = localStorage.getItem("verifier") || "";

      const _params = new URLSearchParams();
      _params.append("client_id", SPOTIFY_CLIENT_ID);
      _params.append("grant_type", "authorization_code");
      _params.append("code", self.authorizationCode || "");
      _params.append("redirect_uri", REDIRECT_URI);
      _params.append("code_verifier", verifier);

      const result = yield fetch(`${SPOTIFY_API_URL}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: _params,
      });

      const { access_token } = yield result.json();

      if (!!access_token) {
        self.accessToken = access_token;
        // TODO: create a serverless function for handling authentication/cookies
        document.cookie = `token=${access_token}; SameSite=Strict`;
      }
    }),
  }))
  .actions((self) => ({
    checkAuth: flow(function* () {
      const params = new URLSearchParams(window.location.search);
      self.authorizationCode = params.get("code");

      if (!self.authorizationCode) {
        self.redirectToAuthCodeFlow();
      } else {
        yield self.fetchAccessToken();

        return true;
      }

      return false;
    }),
  }));

export interface IAuthStore extends Instance<typeof authStore> {}
