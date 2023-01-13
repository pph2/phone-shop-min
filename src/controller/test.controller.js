const { userRegisterError } = require('../constant/err.type');
const { createTest, getUserInfo } = require('../service/test.service')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')

class TestController {
  async register(ctx, next) {
    // 1、获取数据
    const {user_name, password, phone} = ctx.request.body;
    console.log(user_name, password);
    // 2、操作数据库
    try {
      const res = await createTest(user_name, password, phone)
      // 3、返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        }
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body
    // ctx.body = '登陆测试成功'
    // 1. 获取用户信息
    try {
      // 从返回结果对象中删除password属性, 将剩下的属性放到res对象
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
          desToken: jwt.verify(jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }), JWT_SECRET)
        },
      }
    } catch (error) {
      console.error('用户登陆失败', error);
    }
  }
}

module.exports = new TestController()