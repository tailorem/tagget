import { generateRandomString } from "../primitives";

// TODO: add comments
export const generateCodeVerifier = (length: number = 128) => {
  if (!length || length < 43 || length > 128) {
    throw new Error("`length` must be between 43 and 128");
  }

  return generateRandomString(length);
};
