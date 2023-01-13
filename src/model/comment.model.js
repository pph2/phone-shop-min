const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const User = require('./user.model')
const Goods = require('./goods.model')

const Comments = seq.define('ts_comment', {
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
  desc: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    comment: '评论内容'
  },
  isHot: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为热门评论'
  },
  badge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '点赞数'
  }
})

// Comments.sync({alter: true});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
})

Comments.belongsTo(Goods, {
  foreignKey: 'goods_id'
})

module.exports = Comments;