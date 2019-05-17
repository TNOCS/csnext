

## Development

In most cases you want to use the CS NPM hosted packages for your dashboard. If you want to extend/change the CS library yourself, you can work with them locally using the [npm link](https://yarnpkg.com/lang/en/docs/cli/link/) feature. After checking out the [csNext code](https://github.com/TNOCS/csnext), use the following commands to setup a development environment

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

If you want to return to the NPM packages, you can unlink the local depencies using:

``` bash
# unlink local csNext libraries
yarn cs-unlink
```

