# Installation

CS can be installed in different ways. 

## Vue CLI

If you want to quickly start a new demo CS project based on a [Vue CLI](https://cli.vuejs.org/) preset, follow the following steps:

``` bash
# install vue-cli
yarn global add @vue/cli

# create a new vue project based on the CS preset
vue create --preset tnocs/csnext my-project

# start dashboard
cd my-project
yarn serve
```

You can also use the Vue CLI:

``` bash
# install vue-cli
yarn global add @vue/cli

# create a new vue project based on the CS preset
vue create my-project (choose TS as feature + class-style componet style)

# add cs plugin
cd my-project
vue add @csnext/vue-cli-plugin-cs

```

It will ask you to add a default CS project definition (recommended) and provides the option to install one or more CS plugins. After finishing the questions, it will install all required dependencies and you can start your dashboard.

``` bash
# start dashboard
yarn serve
```


## Use CDN version

``` html
<script src="https://unpkg.com/@csnext/cs-client/lib/csclient.cs.js"></script>
```

Because CS relies on both Vue and Vuetify the complete header should be:

``` html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/vue.js"></script>
<script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
<script src="https://unpkg.com/@csnext/cs-client/lib/csclient.cs.js"></script>

```

