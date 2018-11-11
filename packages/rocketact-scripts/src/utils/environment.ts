const isDevelopmentEnv = (): boolean => process.env.NODE_ENV === "developement";
const isProductionEnv = (): boolean => process.env.NODE_ENV === "production";

export { isDevelopmentEnv, isProductionEnv };
