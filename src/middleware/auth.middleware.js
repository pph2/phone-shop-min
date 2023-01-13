const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpireError, invalidToken, hasNotAdminPermission } = require('../constant/err.type')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization
  console.log(ctx.request);
  console.log(token);
  try {
    // user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch(error) {
    switch(error.name) {
      case 'TokenExpiredError':
        console.error('token已过期', error);
        return ctx.app.emit('error', tokenExpireError, ctx)
      case 'JsonWebTokenError' :
        error('无效的token', error)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}
const isLogin = async (ctx, next) => {
  const { user_name } = ctx.state.user;
  if(!user_name) {
    console.log('用户token失效');
    return ctx.app.emit('error', tokenExpiredError, ctx);
  }
  await next();
}
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if(!is_admin) {
    console.log('无管理员权限', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }
}

module.exports = {
  auth,
  isLogin,
  hadAdminPermission,
}