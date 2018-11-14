import { exec } from "child_process";

describe("rocketact-scripts", () => {
  it("should exit if commend do not exist", done => {
    exec(
      "ts-node ./src/bin/rocketact-scripts.ts do-not-exist",
      (error, stdout, stderr) => {
        expect(stdout).toContain("does not exist");
        done();
      }
    );
  });
});
