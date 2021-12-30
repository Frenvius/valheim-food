module.exports = {
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'https://valharvest.frenvius.com/api' // production api
    }
}
