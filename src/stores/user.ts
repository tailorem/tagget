import { Instance, types } from "mobx-state-tree";

export const user = types.model("User", {
  country: types.string, // "CA"
  display_name: types.string, // "name"
  email: types.string, // email@example.com
  // explicit_content: Object { filter_enabled: false, filter_locked: false },
  // external_urls: Object { spotify: "https://open.spotify.com/user/j9vr06yrmwcys0wb2c7ftwpc3" },
  // followers: Object { href: null, total: 7 },
  // href: "https://api.spotify.com/v1/users/j9vr06yrmwcys0wb2c7ftwpc3",
  id: types.identifier, // "rand0mStr1ng"
  // images: Array [ {…} ],
  // product: "premium",
  // type: "user",
  uri: types.string, // "spotify:user:j9vr06yrmwcys0wb2c7ftwpc3"
});

export interface IUser extends Instance<typeof user> {}
