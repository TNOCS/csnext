# Installation

CS can be installed in different ways. 

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

## Vue Import



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

