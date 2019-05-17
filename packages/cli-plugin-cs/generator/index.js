const { hasYarn } = require('@vue/cli-shared-utils');
const chalk = require('chalk');

const version = require('./../package.json').version;

console.log('CS!');

module.exports = (api, options, rootOptions) => {
    const pkg = {
        scripts: {
            'cs-dev':
                'npm link @csnext/cs-client && npm link @csnext/cs-core && npm link @csnext/vue-cli-plugin-cs',
            'cs-unlink':
                'npm unlink @csnext/cs-client && npm unlink @csnext/cs-core && npm unlink @csnext/vue-cli-plugin-cs',
        },
        dependencies: {
            '@csnext/cs-client': version,
            '@csnext/cs-core': version,            
            'vuetify': '^1.3.5',
            'vue-class-component': '^6.3.2',
            'vue-markdown': '^2.2.4',
            'vue-router': '^3.0.1',
            'vue-markdown': '^2.2.4'
        },
        devDependencies: {
            "raw-loader": "^0.5.1"
        }
    };

    console.log(options.csPlugins);

    if (options && options.csPlugins && options.csPlugins.indexOf('split-panel') !== -1) {
        pkg.dependencies[('@csnext/cs-split-panel', version)];
    }

    if (options && options.csPlugins && options.csPlugins.indexOf('billboard') !== -1) {
        pkg.dependencies[('@csnext/cs-billboard', version)];
    }

    if (options && options.csPlugins && options.csPlugins.indexOf('map') !== -1) {
        pkg.dependencies[('@csnext/cs-map', version)];
    }

    api.extendPackage(pkg);

    // add default resources
    api.render('./templates/default');

    api.onCreateComplete(() => {
        console.log('Starting...');
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
            const vuetifyImport = "import Vuetify from 'vuetify';"; // "const Vuetify = require('./../node_modules/vuetify/dist/vuetify.min.js');"                    
            const vuetifyCssImport = "import 'vuetify/dist/vuetify.min.css';";
            const vuetifyUse = 'Vue.use(Vuetify);';
            
            const importProject = "import { project } from './defaultproject';";
            const initProject = 'AppState.Instance.init(project);';
            const appRegistration = '(window as any).app = AppState.Instance;\n';

            const lines = content.split(/\r?\n/g).reverse();

            lastImport = () => { if (lines) { return lines.findIndex(line => line.match(/^import/)) } };

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
            checkImport(vuetifyImport);            
            checkImport(vuetifyCssImport);
            checkImport(vuetifyUse);

            if (options.addDefaultProject) {
                checkImport(importProject);
            }
            checkLast(initProject);
            checkLast(appRegistration);

            api.render('./templates/default');

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
