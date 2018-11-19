import Core from "../../src/Core";

import path from "path";

let originalCwd: () => string;
// let originalLog;

describe("rocketact-scripts: build", () => {
  beforeAll(() => {
    originalCwd = process.cwd;
    // originalLog = console.log;
  });

  afterAll(() => {
    process.cwd = originalCwd;
    // console.log = originalLog;
  });

  it("should build simple project", done => {
    process.cwd = () => path.resolve(__dirname, "../fixture/simple");
    const spy = jest.spyOn(console, "log");
    spy.mockImplementation(() => null);
    const core = new Core();
    core.run("build", { _: [] }).then(() => {
      expect(spy.mock.calls[0][0]).toContain("Build Success");
      done();
    });
  });
});
