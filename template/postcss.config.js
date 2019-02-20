const autoprefixer = require("autoprefixer");
const postcssFlexbugsFixes = require("postcss-flexbugs-fixes");

module.exports = {
  ident: "postcss",
  plugins: [
    postcssFlexbugsFixes,
    autoprefixer({
      flexbox: "no-2009"
    })
  ],
};