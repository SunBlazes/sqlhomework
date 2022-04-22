// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {
    config.resolve.extensions
      .add(".js")
      .add(".vue")
      .add(".json")
      .add(".ts");
    config.resolve.alias
      .set("components", resolve("src/components"))
      .set("network", resolve("src/network"))
      .set("router", resolve("src/router"))
      .set("assets", resolve("src/assets"))
      .set("views", resolve("src/views"))
      .set("utils", resolve("src/utils"));
  },
  devServer: {
    open: true,
    hot: true
  }
};
