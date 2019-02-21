module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  watchPathIgnorePatterns: [
    "<rootDir>\/.*\/build\/"
  ],
  globals: {
    "ts-jest": {
      tsConfig: {
        moduleResolution: "node",
        esModuleInterop: true
      }
    }
  }
};
