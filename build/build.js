const webpack = require("webpack");
const config = require("./webpack.app.config");

const env = "development";
const compiler = webpack(config(env));

compiler.run((err, stats) => {
    return err;
});