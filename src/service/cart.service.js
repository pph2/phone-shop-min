const Cart = require('../model/cart.model');

class CartService {
  async getCartList({user_id, goods_id}) {
    const whereOpt = {}
    user_id && Object.assign(whereOpt, { user_id })
    goods_id && Object.assign(whereOpt, { goods_id })
    const res = await Cart.findAll({
      attributes: ['user_id', 'goods_id'],
      where: whereOpt,
    })
    return res ? res.dataValues : null
  }
  async updateCartList({user_id, goods_id, cart_num}) {
    const whereOpt = {}
    user_id && Object.assign(whereOpt, { user_id })
    goods_id && Object.assign(whereOpt, { goods_id })
    cart_num && Object.assign(whereOpt, { cart_num })
  }
}

module.exports = new CartService();