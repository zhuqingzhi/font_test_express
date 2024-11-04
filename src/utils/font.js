const { Font } = require('fonteditor-core')
const fontEditor = require('fonteditor-core')
const TTF = fontEditor.TTF;
const fs = require('fs')
const path=require('path')
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i).toString(16).toUpperCase();
        // 确保至少有4位十六进制数，不足的前面补0
        var unicodeStr = "0000" + code;
        res[i] = "\\u" + unicodeStr.slice(-4);
    }
    return res.join("");
}

function resolveFontPath(fontPath) {
    return path.resolve(process.cwd(),'./src/assets/font/',fontPath)
}

function getUnicodeByName(name, font) {
    return font.find({
        filter: (gltf) => {
            return gltf.name === name;
        }
    })
}

function createFont(filePath, options={}) {
    const buffer = fs.readFileSync(path.resolve(process.cwd(),'./src',filePath));
    // read font data, support format:
    // - for ttf, otf, woff, woff2, support ArrayBuffer, Buffer
    // - for svg, support string or Document(parsed svg)
    const font = Font.create(buffer, {
        // support ttf, woff, woff2, eot, otf, svg
        type: 'ttf',
        // only read `a`, `b` glyphs
        // subset: [65, 66],
        // read font hinting tables, default false
        hinting: true,
        // read font kerning tables, default false
        kerning: true,
        // transform ttf compound glyph to simple
        compound2simple: true,
        // inflate function for woff
        inflate: undefined,
        // for svg path
        combinePath: false,
        ...options
    });
    return font;
}
function createTTFObject(font) {
    const fontObject = font.get();
    const ttf = new TTF(fontObject)
    return ttf
}

function transformToUnicodeStr(str, type, fontName = '汉仪字酷堂长林体.ttf') {
    // 通过数据库查询偏移量
    const movementMapping = {
        '20':20,
        '30':30
    }
    const movement=movementMapping[type]
    // fontName对应的字体应该是对应了标准unicode码的字体作为基准
    let res = str
    // 测试获取需要转换的文字
    const regex = /<div[^>]*>([\s\S]*?)<\/div>/gi;
    let match;
    let needToTransform=''
    // 使用正则表达式的exec方法循环匹配所有div标签内容
    while ((match = regex.exec(str)) !== null) {
        if (match[1]) {
            // console.log('>>>>', match)
            needToTransform=match[1]
        }
    }
    // 将每个字都通过getUnicodeByName的方式转为unicode?，如果文字数量太多是不是不太好
    // console.log('matched', needToTransform)
    let unicodeStr = encodeUnicode(needToTransform).split('\\u')
    // console.log(unicodeStr)
    // 整体偏移
    unicodeStr = unicodeStr.map(unicode => {
        // 转10进制
        if (!unicode)return
        const a = Number('0x'+unicode)
        return '&#x' + (a + movement).toString(16)+';'
    })
    // console.log(unicodeStr)
    return unicodeStr.join('')
}

module.exports = {
    getUnicodeByName,
    createFont,
    createTTFObject,
    transformToUnicodeStr
}
