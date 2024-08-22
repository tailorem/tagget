// TODO: consider replacing with a library
/** Generate random alphanumeric string of given length */
export const generateRandomString = (length: number) => {
  // TODO: handle length edge cases
  let randomString = "";
  const possibleCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    randomString += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }

  return randomString;
};
