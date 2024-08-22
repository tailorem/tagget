import { Instance, flow, getParent, getSnapshot, types } from "mobx-state-tree";
import { IAuthStore } from "./authStore";
import { IAppStore } from "./appStore";
import { user } from "./user";

export const userStore = types
  .model("UserStore", {
    currentUser: types.maybeNull(user),
  })
  .actions((self) => ({
    getProfile: flow(function* () {
      const authStore = (getParent(self) as IAppStore).authStore as IAuthStore;

      const result = yield fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${authStore.accessToken}` },
      });

      if (result.status != 200) {
        console.warn("unable to ping Spotify API, likely this app is still in development and you haven't been granted access!")
        return;
      }

      const json = yield result.json();

      if (!!json.display_name) {
        self.currentUser = json;
      }
    }),
  }));

export interface IUserStore extends Instance<typeof userStore> {}
