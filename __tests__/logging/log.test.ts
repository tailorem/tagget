import { log } from "@/helpers";
import { Chance } from "chance";

const chance = new Chance();

describe("log function", () => {
  const logSpy = jest.spyOn(global.console, "log");

  it("should run successfully when called with no arguments", () => {
    log();

    expect(logSpy).toHaveBeenCalledWith();
  });

  it("should run successfully when called with a single argument", () => {
    const randomWord = chance.word();
    log(randomWord);

    expect(logSpy).toHaveBeenCalledWith(randomWord);
  });

  it("should run successfully when called with multiple arguments", () => {
    const randomWord = chance.word();
    const randomNumber = chance.integer();
    log(randomWord, randomNumber);

    expect(logSpy).toHaveBeenCalledWith(randomWord, randomNumber);
  });
});
