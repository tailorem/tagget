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

      const json = yield result.json();

      if (!!json.display_name) {
        self.currentUser = json;
      }
    }),
  }));

export interface IUserStore extends Instance<typeof userStore> {}
