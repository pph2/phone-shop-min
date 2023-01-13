const Router = require('koa-router')

const router = new Router({prefix: '/test'})
const { register, login } = require('../controller/test.controller')
const { userValidator, verifyUser, verifyPhone, verifyPassword, crpytPassword, verifyLogin } = require('../middleware/test.middleware')
const { auth } = require('../middleware/auth.middleware')

router.get('/alert', (ctx, next) => {
  ctx.body = 'hello users'
})
router.post('/register', userValidator, verifyUser, verifyPassword, verifyPhone, crpytPassword, register)
router.post('/login', userValidator, verifyLogin, login)

router.patch('/', auth, (ctx, next) => {
  console.log(ctx.state.user);
  ctx.body = '修改密码成功'
})
module.exports = router