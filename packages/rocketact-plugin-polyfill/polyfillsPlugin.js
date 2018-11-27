// add polyfill imports to the first file encountered.

const { addSideEffect } = require("@babel/helper-module-imports");

module.exports = ({ types }) => {
  let entryFile;
  return {
    name: "rocketact-inject-polyfills",
    visitor: {
      Program(path, state) {
        if (!entryFile) {
          entryFile = state.filename;
        } else if (state.filename !== entryFile) {
          return;
        }

        const { polyfills } = state.opts;
        polyfills
          .slice()
          .reverse()
          .forEach(p => {
            addSideEffect(path, p);
          });
      }
    }
  };
};
