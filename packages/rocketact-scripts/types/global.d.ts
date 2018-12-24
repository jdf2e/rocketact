import Core from "../src/Core";

declare global {
  namespace NodeJS {
    interface Global {
      ROCKETACT_PORT: number | undefined;
      ROCKETACT_CORE?: Core;
    }
  }
}
