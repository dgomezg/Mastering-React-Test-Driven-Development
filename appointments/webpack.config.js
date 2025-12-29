module.exports = {
    mode: 'development',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            type: 'javascript/auto',
            use: {
                loader: 'babel-loader',
                options: {
                    sourceType: 'unambiguous',
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    }
};