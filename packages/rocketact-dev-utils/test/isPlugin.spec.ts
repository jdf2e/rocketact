import { isPlugin } from "../src/isPlugin";

describe("isPlugin", () => {
  it("should treat packages that name start with 'rocketact-plugin-' as a plugin", () => {
    expect(isPlugin("abc")).toBeFalsy();
    expect(isPlugin("rocketact-plugin-")).toBeFalsy();
    expect(isPlugin("rocketact-plugin-abc")).toBeTruthy();
  });
});
