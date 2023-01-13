const { getUserInfo } = require('../service/test.service')
const { 
  userFormateError, 
  userAlreadyExited, 
  userDoesNotExist,
  userLoginError,
  invalidPassword,
  phoneIsEmpty,
  phoneHasBeenBind,
  passwordLength,
  passwordIncludeVariety,
} = require('../constant/err.type');
const bcrypt = require('bcryptjs')

const userValidator = async (ctx, next) => {
  console.log(ctx.request.body);
  console.log('获取请求头部分数据测试');
  console.log(ctx.request.headers['x-sg-scenario-version']);
  const { user_name, password, phone } = ctx.request.body;
  console.log('userValidator测试');
  // 合法性
  if(!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx)
    return
  }
  await next()
}
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  console.log('verifyUser测试');
  if(await getUserInfo({ user_name })) {
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
    await next()
}
const verifyPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  console.log('verifyPassword测试');
  if(!password || password.length < 8) {
    ctx.app.emit('error', passwordLength, ctx)
    return
  }
  const reg1 = new RegExp(/^[0-9A-Za-z]+$/);
  const reg2 = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
  if(!reg1.test(password) || !reg2.test(password)) {
    ctx.app.emit('error', passwordIncludeVariety, ctx)
    return
  }
  await next();
}
const verifyPhone = async (ctx, next) => {
  const { phone } = ctx.request.body
  console.log('verifyPhone测试');
  if(!phone) {
    ctx.app.emit('error', phoneIsEmpty, ctx);
    return
  }
  if(await getUserInfo({ phone })) {
    ctx.app.emit('error', phoneHasBeenBind, ctx)
     return
  }
  await next()
}
const crpytPassword = async (ctx, next) => {
  const {password} = ctx.request.body
  console.log('crpytPassword测试');
  const salt = bcrypt.genSaltSync(10)
  // hash保存的是密文
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  console.log('验证登录测试');
  try {
    // 1. 判断用户是否存在(不存在：报错)
    const res = await getUserInfo({ user_name })
    // console.log(res);
    if(!res) {
      console.error('用户名不存在', { user_name });
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    // 2. 密码是否匹配(不匹配：报错)
    if(!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch(err) {
    console.error(err);
    return ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  crpytPassword,
  verifyLogin,
  verifyPhone,
  verifyPassword,
}