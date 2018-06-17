# Getting started

CS can be installed in different ways. 

## Use CDN version

``` bash
https://unpkg.com/@csnext/cs-client/lib/csclient.cs.min.js
```

## Vue CLI

If you want to quickly start a new CS project based on the [Vue CLI](https://cli.vuejs.org/), follow the following steps:

``` bash
# install vue-cli
yarn global add @vue/cli

# create a new vue project based on the CS preset
vue create --preset tnocs/csnext my-project

# start dashboard
yarn serve
```

# Development

In most cases you want to use the CS NPM hosted packages for your dashboard. If you want to extend/change the CS library yourself, you can work with them locally using the [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/) feature. After checking out the [csNext code](https://github.com/TNOCS/csnext), use the following commands to setup a development environment

``` bash
# install all dependencies and create links 
yarn

# compile typescript, create bundles, watch for changes
yarn dev
```

After setting up the development environment for csNext you can now setup the links for your dashboard

``` bash
# create link to local csNext libraries
yarn cs-dev
```

