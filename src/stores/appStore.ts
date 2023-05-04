import { Instance, getSnapshot, types } from "mobx-state-tree";
import { useContext, createContext } from "react";
import { authStore, authStoreInitialState } from "./authStore";
import { userStore } from "./userStore";

export const appStore = types
  .model("AppStore", {
    authStore: types.optional(authStore, authStoreInitialState),
    userStore: types.optional(userStore, { currentUser: null }),
  })
  .actions((self) => ({
    afterCreate() {
      console.log("APP STORE", getSnapshot(self));
    },
  }))
  .create();

export interface IAppStore extends Instance<typeof appStore> {}

const AppStoreContext = createContext<null | IAppStore>(null);
export const StoreProvider = AppStoreContext.Provider;

export const useStore = () => {
  const store = useContext(AppStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }

  return store;
};
