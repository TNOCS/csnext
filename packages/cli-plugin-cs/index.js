module.exports = (api, { parallel }) => {
  const fs = require("fs");
  const path = require("path");

  api.chainWebpack(config => {    

    console.log('CS?');

    // const htmlRule = webpackConfig.module
    //   .rule('html')
    //     .test(/\.html?$/)
    //     .include
    //       .add(api.resolve('src'))
    //       .end()
    //     .use('raw-loader')
    //       .loader('raw-loader')          
    //       .end()

    // config.rule('html').use('raw-loader');
    
    // const htmlRule = config.module
    //   .rule("ts")
    //   .test(/\.html?$/)
    //   .include.add(api.resolve("src"))
    //   .add(api.resolve("test"))
    //   .end();

    // // add a loader to both *.ts & vue<lang="ts">
    // const addLoader = loader => {
    //   const use = htmlRule.use(loader.loader).loader(loader.loader);
    //   if (loader.options) {
    //     use.options(loader.options);
    //   }
    //   // vueLoader.tap(options => {
    //   //   options.loaders = options.loaders || {};
    //   //   options.loaders.ts = options.loaders.ts || [];
    //   //   options.loaders.ts.push(loader);
    //   //   return options;
    //   // });
    // };

    // addLoader({
    //   loader: "raw-loader"
    // });
  

    // console.log(config);
    // config.resolve.alias['Vue']= "path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'";
    config.resolve.alias.set('vue$','vue/dist/vue.esm.js');
    config.resolve.alias.set("Vue", "vue/dist/vue.esm.js");
    config.resolve.symlinks = false;
    // config.resolve.alias.set("Vuetify$", "vuetify/dist/vuetify.js");
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
