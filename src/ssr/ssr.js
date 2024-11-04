const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const { transformToUnicodeStr } = require('../utils/font')

const str ='<div>服务器保存私钥和公钥，公钥传递给客户端，客户端根据时间戳，验证码等信息使用公钥加密，生成会话秘钥</div>'
function renderSsr(type) {
    const unicodeStr = transformToUnicodeStr(str, type)
    const ssrApp = createSSRApp({
        data: () => {
            return {
                title: 'vue-ssr'
            }
        },
        template: `
        <section>
            ${unicodeStr}
        </section>
    `
    })
    return renderToString(ssrApp)
}

module.exports = renderSsr