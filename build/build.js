const webpack = require("webpack");
const config = require("./webpack.app.config");

const env = "production";
const compiler = webpack(config(env));

compiler.run((err, stats) => {
    return err;
});
