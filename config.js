module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    apiPort: 3030,
    app: {
      name: 'Sharkpunch Demo',
      secret: '123@666@999@KITTENS@MITTENS'      
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: 3030,
    app: {
      name: 'Sharkpunch Demo',
      secret: '123@666@999@KITTENS@MITTENS'
    }
  }
}[process.env.NODE_ENV || 'development'];