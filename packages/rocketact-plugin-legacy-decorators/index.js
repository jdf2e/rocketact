module.exports = api => {
  api.chainWebpack(webpackChain => {
    webpackChain.module
      .rule("compile")
      .use("babel")
      .tap(options =>
        merge(options, {
          plugins: [
            [
              require.resolve("@babel/plugin-proposal-decorators"),
              {
                legacy: true
              }
            ]
          ]
        })
      );
  });
};
