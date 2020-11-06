module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["<rootDir>/.*/build/"],
  setupTestFrameworkScriptFile: "./jest.setup.js",
  globals: {
    "ts-jest": {
      tsConfig: {
        moduleResolution: "node",
        esModuleInterop: true,
        diagnostics: {
          warnOnly: true
        }
      }
    }
  }
};
