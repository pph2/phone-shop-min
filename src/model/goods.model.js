const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

const Goods = seq.define('ts_goods',
  {
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品名称'
    },
    goods_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '商品价格'
    },
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '商品库存',
    },
    goods_img: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品图片url',
    },
    goods_parameter: {
      type: DataTypes.STRING(1296),
      allowNull: false,
      comment: '商品参数'
    },
    goods_brand: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品品牌'
    },
    goods_desc: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '商品描述'
    }
  }
);

// Goods.sync({ force: true })

module.exports = Goods