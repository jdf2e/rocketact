import { removeTrailingSlash } from "../src/removeTrailingSlash";

describe("removeTrailingSlash", () => {
  it("should remove all trailing slash", () => {
    expect(removeTrailingSlash("abc///")).toBe("abc");
    expect(removeTrailingSlash("abc//")).toBe("abc");
    expect(removeTrailingSlash("abc/")).toBe("abc");
    expect(removeTrailingSlash("abc")).toBe("abc");
    expect(removeTrailingSlash("/aa/")).toBe("/aa");
    expect(removeTrailingSlash("/")).toBe("");
    expect(removeTrailingSlash("//")).toBe("");
  });
});
