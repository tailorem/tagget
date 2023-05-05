interface ICookieObject {
  [key: string]: string;
}

export const parseCookie = (cookie: string): ICookieObject => {
  return cookie
    .split(";")
    .map((attribute) => attribute.split("="))
    .reduce((acc, attribute) => {
      console.log("attribute", attribute);

      acc[decodeURIComponent(attribute[0].trim())] = decodeURIComponent(
        attribute[1].trim()
      );

      return acc;
    }, {} as ICookieObject);
};
