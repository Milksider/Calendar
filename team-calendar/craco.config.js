const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@Assets': path.resolve(__dirname, './src/assets'),
            '@Components': path.resolve(__dirname, './src/components'),
            '@Pages': path.resolve(__dirname, './src/pages'),
            '@Hooks': path.resolve(__dirname, './src/hooks'),
            '@Models': path.resolve(__dirname, './src/models'),
            '@Constants': path.resolve(__dirname, './src/constants'),
            '@Services': path.resolve(__dirname, './src/services'),
            '@Store': path.resolve(__dirname, './src/store'),
        },
        resolve: {fallback: {'process': require.resolve('process/browser')}}
    },
    devServer: {
        port: 3001,
    }
};
