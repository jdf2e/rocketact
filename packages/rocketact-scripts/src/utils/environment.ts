const isDevelopmentEnv = (): boolean => process.env.NODE_ENV === "development";
const isProductionEnv = (): boolean => process.env.NODE_ENV === "production";

export { isDevelopmentEnv, isProductionEnv };
