const { hasYarn } = require('@vue/cli-shared-utils');
const chalk = require('chalk');

module.exports = (api, options, rootOptions) => {
    const pkg = {
        scripts: {
            'cs-dev':
                'yarn link @csnext/cs-client && yarn link @csnext/cs-core && yarn link @csnext/vue-cli-plugin-cs',
            'cs-unlink':
                'yarn unlink @csnext/cs-client && yarn unlink @csnext/cs-core && yarn unlink @csnext/vue-cli-plugin-cs',
        },
        dependencies: {
            '@csnext/cs-client': '0.0.54',
            '@csnext/cs-core': '0.0.54',
            vuetify: '^1.1.9',
            'vue-router': '^3.0.1',
            'vue-markdown': '^2.2.4'
        },
        devDependencies: {
            "raw-loader": "^0.5.1"
        }
    };

    if (options.csLayoutPlugins.indexOf('muuri') !== -1) {
        pkg.dependencies[('@csnext/cs-muuri', csVersion)];
    }

    api.extendPackage(pkg);

    // add icons
    api.render('./templates/icons');

    //   api.render("./templates/default", {
    //     ...options
    //   });

    api.onCreateComplete(() => {
        const fs = require('fs');

        const ts = api.hasPlugin('typescript');
        if (!ts) {
            console.log(
                'Sorry, for now typescript is required for the CS plugin to work!'
            );
        }
        console.log(options);

        // Modify main.js
        {
            const tsPath = api.resolve('./src/main.ts');
            const jsPath = api.resolve('./src/main.js');

            const mainPath = fs.existsSync(tsPath) ? tsPath : jsPath;
            let content = fs.readFileSync(mainPath, { encoding: 'utf8' });

            content = content.replace('h(App)', 'h(CsApp)');

            const CsClientImport =
                "import { CsApp, AppState } from '@csnext/cs-client';";
            const vuetifyImport = "import Vuetify from 'vuetify'"; // "const Vuetify = require('./../node_modules/vuetify/dist/vuetify.min.js');"
            const vuetifyCssImport = "import 'vuetify/dist/vuetify.min.css';";            
            const vuetifyUse = 'Vue.use(Vuetify);';
            const importProject = "import { project } from './defaultproject';";
            const initProject = 'AppState.Instance.init(project);';
            const appRegistration = '(<any>window).app = AppState.Instance;';

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
            checkImport(vuetifyUse);

            if (options.addDefaultProject) {
                checkImport(importProject);
            }
            checkLast(initProject);
            // checkLast(appRegistration);

            api.render('./templates/icons');

            // console.log(lines);

            //   // Modify app
            lines.forEach(line => {
                line = line.replace(`h => h(App)`, 'h => h(CsApp)');
            });

            content = lines.reverse().join('\n');
            fs.writeFileSync(mainPath, content, { encoding: 'utf8' });
        }
    });
};
