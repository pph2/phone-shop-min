const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const User = require('./user.model')
const Goods = require('./goods.model');

const Collect = seq.define('ts_collect', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id, 外键'
  },
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品id, 外键'
  },
})
// Collect.sync({force: true});

Collect.belongsTo(User, {
  foreignKey: 'user_id'
})

Collect.belongsTo(Goods, {
  foreignKey: 'goods_id',
})

module.exports = Collect