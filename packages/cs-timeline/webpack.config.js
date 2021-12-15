const buildConfig = require("./../webpack.config.base.js");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

const config = buildConfig(
    __dirname + "/lib",
    "cstimeline",
    { cs: ["./src/index.ts"] },
    {
        "@csnext/cs-core": "@csnext/cs-core",
        "@csnext/cs-client": "@csnext/cs-client",
        "vis-data/esnext": "vis-data/esnext"
    },
    "cstimeline",
    [
        new MomentLocalesPlugin({
            localesToKeep: ["es-us", "nl"]
        })
    ]
);

config.node = {
    fs: "empty"
};

module.exports = [config];
