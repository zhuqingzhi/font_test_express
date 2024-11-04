const express = require('express')
const ssrRouter=require('./routers/ssr_test')
const app = express()

app.get('/', (req, res, next) => {
    res.send('helloworld')
})
app.use('/ssr', ssrRouter)

app.listen('1024', () => {
    console.log('监听在1024')
})