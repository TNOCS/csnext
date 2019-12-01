module.exports = {
    devServer: {
        port: 8080
    },
    configureWebpack: {
        resolve: {
            symlinks: false,
            alias: {
                "@": "src/",
                Vue: "vue/dist/vue.esm.js"
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: "raw-loader",
                    exclude: ["/public/index.html"]
                }
            ]
        }
    }
};
