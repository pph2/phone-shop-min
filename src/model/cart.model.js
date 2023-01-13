const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = require('./user.model')
const Goods = require('./goods.model')

const Cart = seq.define('ts_cart', 
  {
    goods_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '商品ID'
    },
    cart_num: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      defaultValue: 0,
      comment: '购物车数量'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID',
    },
  }
)
// Cart.sync({alter: true});

Cart.belongsTo(User, {
  foreignKey: 'user_id',
})
Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
})

module.exports = Cart;