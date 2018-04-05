const { hasYarn } = require("@vue/cli-shared-utils");
const chalk = require("chalk");

module.exports = (api, options, rootOptions) => {
  const csVersion = "0.0.19";
  const pkg = {
    dependencies: {
      "@csnext/cs-client": csVersion,
      "@csnext/cs-core": csVersion,
      vuetify: "^1.0.13",
      "vue-router": "^3.0.1",
      "raw-loader": "^0.5.1"
    },
    devDependencies: {
      "@types/geojson": "^7946.0.1"
    }
  };

  if (options.csLayoutPlugins.indexOf("muuri") !== -1) {
    pkg.dependencies[("@csnext/cs-muuri", csVersion)];
  }

  api.extendPackage(pkg);


  // add icons
  api.render("./templates/icons");

  //   api.render("./templates/default", {
  //     ...options
  //   });

  api.onCreateComplete(() => {
    const fs = require("fs");

    const ts = api.hasPlugin("typescript");
    if (!ts) {
      console.log(
        "Sorry, for now typescript is required for the CS plugin to work!"
      );
    }
    console.log(options);

    // Modify main.js
    {
      const tsPath = api.resolve("./src/main.ts");
      const jsPath = api.resolve("./src/main.js");

      const mainPath = fs.existsSync(tsPath) ? tsPath : jsPath;
      let content = fs.readFileSync(mainPath, { encoding: "utf8" });

      content = content.replace("h(App)", "h(CsApp)");

      const CsClientImport =
        "import { CsApp, AppState } from '@csnext/cs-client';";
      const vuetifyImport = "import Vuetify from 'vuetify'"; // "const Vuetify = require('./../node_modules/vuetify/dist/vuetify.min.js');"
      const vuetifyCssImport = "import 'vuetify/dist/vuetify.min.css';";
      const iconsImport = "import './assets/icons.css';";
      const vuetifyUse = "Vue.use(Vuetify);";
      const importProject = "import { project } from './defaultproject';";
      const initProject = "AppState.Instance.init(project);";
      const appRegistration = "(<any>window).app = AppState.Instance;";

      const lines = content.split(/\r?\n/g).reverse();

      lastImport = () => lines.findIndex(line => line.match(/^import/));

      checkImport = i => {
        if (content.indexOf(i) === -1) {
          lines[lastImport()] += `\n` + i;
        }
      };
      checkLast = i => {
        if (content.indexOf(i) === -1) {
          lines[0] += `\n` + i;
        }
      };

      checkImport(CsClientImport);
      checkImport(vuetifyImport);
      checkImport(vuetifyCssImport);
      checkImport(iconsImport);
      checkImport(vuetifyUse);

      if (options.addDefaultProject) {
        checkImport(importProject);
      }
      checkLast(initProject);
      checkLast(appRegistration);

      api.render("./templates/icons");

      // console.log(lines);

      //   // Modify app
      lines.forEach(line => {
        line = line.replace(`h => h(App)`, "h => h(CsApp)");
      });

      content = lines.reverse().join("\n");
      fs.writeFileSync(mainPath, content, { encoding: "utf8" });
    }

    // if (options.addServer) {
    //   // Git ignore
    //   {
    //     const gitignorePath = api.resolve("./.gitignore");
    //     let content;

    //     if (fs.existsSync(gitignorePath)) {
    //       content = fs.readFileSync(gitignorePath, { encoding: "utf8" });
    //     } else {
    //       content = "";
    //     }

    //     content += "\n/live/\n";

    //     fs.writeFileSync(gitignorePath, content, { encoding: "utf8" });
    //   }
    // }

    // if (options.addApolloEngine) {
    //   // Modify .env.local file
    //   const envPath = api.resolve("./.env.local");
    //   let content = "";

    //   if (fs.existsSync(envPath)) {
    //     content = fs.readFileSync(envPath, { encoding: "utf8" });
    //   }

    //   content += `VUE_APP_APOLLO_ENGINE_KEY=${options.apolloEngineKey}\n`;
    //   fs.writeFileSync(envPath, content, { encoding: "utf8" });
    // }

    // // Linting
    // try {
    //   const lint = require("@vue/cli-plugin-eslint/lint");
    //   lint({ silent: true }, api);
    // } catch (e) {
    //   // No ESLint vue-cli plugin
    // }

    // if (options.addServer) {
    //   api.exitLog(
    //     `Start the GraphQL API Server with ${chalk.cyan(
    //       `${hasYarn() ? "yarn" : "npm"} run graphql-api`
    //     )}`,
    //     "info"
    //   );
    //   if (options.addMocking) {
    //     api.exitLog(
    //       `Customize the mocks in ${chalk.cyan("src/graphql-api/mocks.js")}`,
    //       "info"
    //     );
    //   }
    //   if (options.addApolloEngine) {
    //     api.exitLog(
    //       `The Apollo Engine API key has been added to ${chalk.cyan(
    //         ".local.env"
    //       )}`,
    //       "info"
    //     );
    //   }
    // }
  });
};
