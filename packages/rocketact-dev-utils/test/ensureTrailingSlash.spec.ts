import { ensureTrailingSlash } from "../src/ensureTrailingSlash";

describe("ensureTrailingSlash", () => {
  it("should add trailing slash if the original text do not have", () => {
    expect(ensureTrailingSlash("abc")).toBe("abc/");
    expect(ensureTrailingSlash("")).toBe("/");
  });

  it("should remove extra trailing slash", () => {
    expect(ensureTrailingSlash("abc///")).toBe("abc/");
    expect(ensureTrailingSlash("abc//")).toBe("abc/");
  });

  it("should return the origin string if it do have 1 trailing slash", () => {
    expect(ensureTrailingSlash("abc/")).toBe("abc/");
  });
});
