import path from "path";
import { exec } from "child_process";

describe("rocketact-scripts", () => {
  it("should exit if commend do not exist", done => {
    exec(
      `ts-node --files ./src/bin/rocketact-scripts.ts do-not-exist`,
      {
        cwd: path.resolve(__dirname, "../..")
      },
      (error, stdout, stderr) => {
        expect(stdout).toContain("does not exist");
        done();
      }
    );
  });
});
