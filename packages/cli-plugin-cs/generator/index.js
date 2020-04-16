const { hasYarn } = require("@vue/cli-shared-utils");
const chalk = require("chalk");

const version = require("./../package.json").version;

console.log("CS!");

module.exports = (api, options, rootOptions) => {
    const pkg = {
        scripts: {
            linkcs:
                "yarn link @csnext/cs-client && yarn link @csnext/cs-core && yarn link @csnext/vue-cli-plugin-cs",
            unlinkcs:
                "pnpm unlink @csnext/cs-client && pnpm unlink @csnext/cs-core && pnpm unlink @csnext/vue-cli-plugin-cs"
        },
        dependencies: {
            "@csnext/cs-client": version,
            "@csnext/cs-core": version,
            "vue-class-component": "latest",
            "vue": "^2.6.10"
        },
        devDependencies: {
            "@types/socket.io-client": "^1.4.32",
            "raw-loader": "^4.0.0",
            "@vue/cli-plugin-babel": "^4.1.1",
            "@vue/cli-plugin-typescript": "^4.1.1",
            "@vue/cli-service": "^4.1.1",
            "babel-core": "7.0.0-bridge.0",
            "vue-class-component": "^7.1.0",
            "vue-property-decorator": "^8.3.0",
            "vue-template-compiler": "^2.6.10",
            "core-js": "^3.4.5",
            "sass-loader": "^8.0.0",
            "sass": "1.23.7",
            "typescript": "^3.7.2",
            "@babel/core": "^7.7.4",            
            "html-loader": "^0.5.5",
            "reflect-metadata": "^0.1.13"
        }
    };

    console.log(options.csPlugins);

    if (
        options &&
        options.csPlugins &&
        options.csPlugins.indexOf("split-panel") !== -1
    ) {
        pkg.dependencies[("@csnext/cs-split-panel", version)];
    }

    if (
        options &&
        options.csPlugins &&
        options.csPlugins.indexOf("billboard") !== -1
    ) {
        pkg.dependencies[("@csnext/cs-billboard", version)];
    }

    if (
        options &&
        options.csPlugins &&
        options.csPlugins.indexOf("map") !== -1
    ) {
        pkg.dependencies[("@csnext/cs-map", version)];
    }

    api.extendPackage(pkg);

    // add default resources
    api.render("./templates/default");

    api.onCreateComplete(() => {
        console.log("Starting...");
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
            const mainPath = api.resolve("./src/main.ts");
         
            let content = fs.readFileSync(mainPath, { encoding: "utf8" });

            content = content.replace("h(App)", "h(CsApp)");

            const CsClientImport =
                "import { CsApp, CsPlugin, AppState } from '@csnext/cs-client';";
            const CsNextUse = "Vue.use(CsPlugin);";

            const importProject = "import { project } from './defaultproject';";
            const initProject = "AppState.Instance.init(project);";
            const appRegistration =
                "(window as any).app = AppState.Instance;\n";

            const lines = content.split(/\r?\n/g).reverse();

            lastImport = () => {
                if (lines) {
                    return lines.findIndex(line => line.match(/^import/));
                }
            };

            checkImport = i => {
                if (content && content.indexOf(i) === -1) {
                    lines[lastImport()] += `\n` + i;
                }
            };
            checkLast = i => {
                if (content && content.indexOf(i) === -1) {
                    lines[0] += `\n` + i;
                }
            };

            checkImport(CsClientImport);
            checkImport(CsNextUse);

            if (options.addDefaultProject) {
                checkImport(importProject);
            }
            checkLast(initProject);
            checkLast(appRegistration);

         //   api.render("./templates/default");
            lines.forEach(line => {
                line = line.replace(`h => h(App)`, "h => h(CsApp)");
            });

            content = lines.reverse().join("\n");
            fs.writeFileSync(mainPath, content, { encoding: "utf8" });
        }
    });
};
