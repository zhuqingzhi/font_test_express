const express = require('express')
const ssrRouter=require('./routers/ssr_test')
const app = express()
const loginRouter = require('./routers/login')
const bodyParser = require('body-parser')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req, res, next) => {
    res.send('helloworld')
})
app.use('/ssr', ssrRouter)
app.use('', loginRouter)

app.listen('1024', () => {
    console.log('监听在1024')
})