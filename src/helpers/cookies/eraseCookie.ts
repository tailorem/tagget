export const eraseCookie = (name: string) => {
  document.cookie = name + "=; SameSite=Strict; Max-Age=-99999999;";
};
