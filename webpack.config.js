const path = require('path');

module.exports = {
    entry: './src/main.ts',
    mode: 'production',
    devtool: 'inline-source-map',
    optimization: {
        usedExports: false,
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "animejs": path.resolve(__dirname, 'node_modules/animejs/lib/anime.es.js')
        }
    },
    externals: {
        x: 'animejs'
    },
    output: {
        filename: 'simple-animation.js',
        path: path.resolve(__dirname, 'dist'),
        libraryExport: 'default',
        libraryTarget: 'umd',
        library: 'SimpleAnimation',
        umdNamedDefine: true
    }
};