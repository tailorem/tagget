// TODO: add comments
export const generateCodeChallenge = async (verifier: string) => {
  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  // const buf = Buffer.from(
  //   String.fromCharCode(...new Uint8Array(digest)),
  //   "base64"
  // );
  // return String.fromCharCode(...new Uint8Array(digest));
  return (
    btoa(String.fromCharCode(...new Uint8Array(digest)))
      // return buf
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "")
  );
};
