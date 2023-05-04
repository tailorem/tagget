import { Instance, flow, getParent, types } from "mobx-state-tree";
import { IAuthStore } from "./authStore";
import { IAppStore } from "./appStore";

export const user = types.model("User", {
  name: types.string,
});

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

      const json = yield result.json();
      console.log(json);
      return json;
    }),
  }));

export interface IAuthStoreModel extends Instance<typeof userStore> {}
