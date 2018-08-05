module.exports = {    
    baseUrl: '/',
    configureWebpack: {
      resolve: {
          symlinks: false
      },
      module: {
        rules: [        
          {
            test: /\.html$/,
            loader: "raw-loader",
            exclude: ["./public/index.html"]
          }
        ]
      }
    }
  };