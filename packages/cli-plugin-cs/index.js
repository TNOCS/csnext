module.exports = (api, { parallel }) => {
  const fs = require("fs");
  const path = require("path");

  api.chainWebpack(config => {
    console.log("update webpack");
    // console.log(config);
    // config.resolve.alias['Vue']= "path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'";
    config.resolve.alias.set('vue$','vue/dist/vue.esm.js');
    config.resolve.alias.set("Vue", "vue/dist/vue.esm.js");
    config.resolve.alias.set("Vuetify$", "vuetify/dist/vuetify.js");
    // config
    //   .plugin("fork-ts-checker")
    //   .use(require("fork-ts-checker-webpack-plugin"), [
    //     {
    //       vue: true,
    //       tslint:
    //         lintOnSave !== false && fs.existsSync(api.resolve("tslint.json")),
    //       formatter: "codeframe",
    //       // https://github.com/TypeStrong/ts-loader#happypackmode-boolean-defaultfalse
    //       checkSyntacticErrors: useThreads
    //     }
    //   ]);
  });
};

// module.exports = {
//   chainWebpack: config => {
//     console.log("Update")
//     config.resolve.alias.set('Vue',"path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'");
//     config.resolve.alias.set('vue',"path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'");

//   }
// }
