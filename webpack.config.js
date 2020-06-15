const path = require('path');

module.exports = {
    entry: {
       model: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        watchContentBase: true,
    },
    module: {
        rules: [
            {
                test: /\.(bin|gltf)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    }
};