module.exports = {
    publicPath: './',
    devServer: {
        // open: process.platform === 'darwin',
        // host: '0.0.0.0',
        // port: 8080,
        proxy: {
            '/': {
                target: "http://47.102.195.147/",
                changeOrigin: true,
                secure: false
                // ws: false
                // pathRewrite: {
                //     '^/user': ''
                //   }
            }
        }
    }
}