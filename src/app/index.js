const Koa = require('koa')
const KoaBody = require('koa-body')
const errHandler = require('./errHandler')

const testRouter = require('../router/test.route')

const app = new Koa()

app.on('error', errHandler)
app.use(KoaBody())
app.use(testRouter.routes())

module.exports = app