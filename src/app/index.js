const Koa = require('koa')
const KoaBody = require('koa-body')

const testRouter = require('../router/test.route')

const app = new Koa()

app.use(KoaBody())
app.use(testRouter.routes())

module.exports = app