import { getValidEntries } from "./paths";

import path from "path";

describe("getValidEntries", () => {
  it("should ignore unmatched entry", () => {
    expect(
      getValidEntries(
        path.resolve(process.cwd(), "./test/fixture/noValidEntry")
      )
    ).toEqual({});
  });
});
