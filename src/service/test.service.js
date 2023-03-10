const User = require('../model/user.model')
class TestService {
  async createTest(user_name, password, phone) {
    const res = await User.create({ user_name, password, phone })
    return res.dataValues
  }
  async getUserInfo({ id, user_name, password, is_admim, phone }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admim && Object.assign(whereOpt, { is_admim })
    phone && Object.assign(whereOpt, { phone })
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin', 'phone'],
      where: whereOpt,
    })
    return res ? res.dataValues : null
  }
}

module.exports = new TestService()