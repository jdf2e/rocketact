import { getValidEntries } from "../src/getValidEntries";

import path from "path";

describe("getValidEntries", () => {
  it("should ignore unmatched entry", () => {
    expect(
      getValidEntries(
        path.resolve(process.cwd(), "./test/fixture/noValidEntry")
      )
    ).toEqual({});
  });

  it("should return valid entries", () => {
    const entries = getValidEntries(
      path.resolve(process.cwd(), "./test/fixture/hasValidEntry")
    );

    expect(entries).toMatchObject({
      a: {
        js: expect.stringMatching(/a\.js$/),
        html: expect.stringMatching(/a\.html$/)
      },
      b: {
        js: expect.stringMatching(/b\.jsx$/),
        html: expect.stringMatching(/b\.html$/)
      },
      c: {
        js: expect.stringMatching(/c\.ts$/),
        html: expect.stringMatching(/c\.html$/)
      },
      d: {
        js: expect.stringMatching(/d\.tsx$/),
        html: expect.stringMatching(/d\.html$/)
      }
    });

    expect(path.isAbsolute(entries.a.js)).toBeTruthy();
    expect(path.isAbsolute(entries.a.html)).toBeTruthy();
  });
});
