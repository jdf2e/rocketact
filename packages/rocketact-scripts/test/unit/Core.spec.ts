import Core from "../../src/Core";
import CoreAPI from "../../src/CoreAPI";

describe("Core", () => {
  describe("#applyWebpackChainFns", () => {
    it("should run webpackChainFns in sequence", () => {
      const core = new Core();
      const coreAPI = new CoreAPI(core);

      let seq = "";

      const fn1 = jest.fn(() => (seq = `${seq}1`));
      const fn2 = jest.fn(() => (seq = `${seq}2`));

      coreAPI.chainWebpack(fn1);
      coreAPI.chainWebpack(fn2);

      core.applyWebpackChainFns();

      expect(fn1).toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
      expect(seq).toBe("12");
    });

    it("should call webpackChainFn with its webpackChain instance", () => {
      const core = new Core();
      const coreAPI = new CoreAPI(core);

      const fn = jest.fn();

      coreAPI.chainWebpack(fn);

      core.applyWebpackChainFns();

      expect(fn).toHaveBeenCalledWith(core.webpackChain);
    });
  });
});
