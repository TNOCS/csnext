export = buildConfig;
declare function buildConfig(path: any, libraryName: any, entry: any, externals: any, analyzer: any): {
    entry: any;
    devtool: string;
    output: {
        path: any;
        filename: string;
        library: any;
        libraryTarget: string;
    };
    module: {
        rules: ({
            test: RegExp;
            exclude: RegExp[];
            use: {
                loader: string;
            }[];
            loader?: undefined;
        } | {
            test: RegExp;
            loader: string;
            exclude?: undefined;
            use?: undefined;
        } | {
            test: RegExp;
            use: {
                loader: string;
            }[];
            exclude?: undefined;
            loader?: undefined;
        } | {
            test: RegExp;
            use: (string | {
                loader: string;
                options: {
                    implementation: any;
                    fiber: any;
                    indentedSyntax: boolean;
                };
            })[];
            exclude?: undefined;
            loader?: undefined;
        })[];
    };
    optimization: {
        minimize: boolean;
    };
    externals: any;
    resolve: {
        extensions: string[];
    };
    plugins: any[];
};
