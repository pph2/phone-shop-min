const Router = require('koa-router')

const router = new Router({prefix: '/test'})
const { register } = require('../controller/test.controller')

router.get('/', (ctx, next) => {
  ctx.body = 'hello users'
})
router.post('/', register)

module.exports = router