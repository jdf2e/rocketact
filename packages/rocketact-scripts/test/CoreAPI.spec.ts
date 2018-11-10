import Core from "../src/Core";
import CoreAPI from "../src/CoreAPI";

describe("CoreAPI", () => {
  describe("#chainWebpack", () => {
    it("should push argument fn to Core.webpackChainFns", () => {
      const core = new Core();
      const coreAPI = new CoreAPI(core);

      const fn = jest.fn();

      coreAPI.chainWebpack(fn);

      expect(core.webpackChainFns[0]).toBe(fn);
    });
  });
});
