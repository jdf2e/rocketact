module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  testMatch: [  "**/test/?(*.)+(spec|test).+(j|t)s?(x)" ]
};
