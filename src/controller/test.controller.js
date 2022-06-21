const { createTest, getUserInfo } = require('../service/test.service')

class TestController {
  async register(ctx, next) {
    // 1、获取数据
    const {user_name, password} = ctx.request.body;
    console.log(user_name, password);
    // 合法性
    if(!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body);
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      }
      return
    }
    // 合理性
    if(getUserInfo({ user_name })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: '',
      }
      return
    }
    // 2、操作数据库
    const res = await createTest(user_name, password)
    // 3、返回结果
    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      }
    }
  }

  async login(ctx, next) {
    ctx.body = '登录测试成功'
  }
}

module.exports = new TestController()