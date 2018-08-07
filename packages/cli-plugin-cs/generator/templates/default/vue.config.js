module.exports = {
    baseUrl: '/',
    devServer: {
        port: 8080
    },
    configureWebpack: {
        resolve: {
            symlinks: false
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: ['./public/index.html']
                }
            ]
        }
    }
};
