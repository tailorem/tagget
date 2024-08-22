import { log } from "@/helpers";
import { Chance } from "chance";

const chance = new Chance();

describe("log function", () => {
  const logSpy = jest.spyOn(global.console, "log");

  it("should call console.log with no arguments", () => {
    log();

    expect(logSpy).toHaveBeenCalledWith();
  });

  it("should call console.log with a single argument", () => {
    const randomWord = chance.word();
    log(randomWord);

    expect(logSpy).toHaveBeenCalledWith(randomWord);
  });

  it("should call console.log with multiple arguments", () => {
    const randomWord = chance.word();
    const randomNumber = chance.integer();
    const randomObject = { [chance.word()]: chance.word() };

    log(randomWord, randomNumber, randomObject);

    expect(logSpy).toHaveBeenCalledWith(randomWord, randomNumber, randomObject);
  });
});
