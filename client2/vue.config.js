module.exports = {
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    open: true,
    hot: true,
    overlay: {
      errors: false,
      warnings: false
    }
  },
  lintOnSave: process.env.NODE_ENV === 'production',
}
