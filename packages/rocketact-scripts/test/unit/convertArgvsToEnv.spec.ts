import convertArgvsToEnv from "../../src/utils/convertArgvsToEnv";

describe("convertArgvsToEnv", () => {
  it("should ignore _ and -- in minimist.ParsedArgs", () => {
    expect(convertArgvsToEnv({ _: ["a"], "--": ["b", "c"] })).toEqual({});
  });

  it("should parse options properly", () => {
    expect(
      convertArgvsToEnv({
        _: [],
        opt1: false,
        opt2: "false",
        opt3: "true",
        opt4: "hi there"
      })
    ).toEqual({
      NO_OPT1: "true",
      NO_OPT2: "true",
      OPT3: "true",
      OPT4: "hi there"
    });
  });
});
