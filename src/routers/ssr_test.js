const express = require('express')
const router = express.Router()
const ssrPage=require('../ssr/ssr')

// 中间件
router.use(function log(req, res, next) {
    console.log('进入中间件')
    next()
})
router.get('/document', async (req, res, next) => {
    const type = req.query.type
    const html = await ssrPage(type)
    console.log('html',html)
    res.send(html)
})

module.exports=router