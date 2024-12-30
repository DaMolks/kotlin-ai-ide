const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/browser/frontend-module.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'lib'),
        libraryTarget: 'umd',
        library: 'kotlin-ai-ide'
    },
    mode: process.env.NODE_ENV || 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    externals: {
        '@theia/core': 'theia.core',
        'react': 'react',
        'react-dom': 'react-dom'
    }
};