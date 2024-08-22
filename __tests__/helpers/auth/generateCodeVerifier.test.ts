import { generateCodeVerifier } from "@/helpers";

const errorMessage = "`length` must be between 43 and 128";

describe("generateCodeVerifier function", () => {
  it.todo("should return string of length of %i");
  it("should throw an error if `length` is less than 43", () => {
    expect(() => generateCodeVerifier(6)).toThrow(errorMessage);
  });
  it("should throw an error if `length` is greater than 128", () => {
    expect(() => generateCodeVerifier(220)).toThrow(errorMessage);
  });
  it("should return a string of length 128 when called with no argument", () => {
    const verifier = generateCodeVerifier();

    expect(verifier).toHaveLength(128);
  });
});
