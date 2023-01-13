const Goods = require('../model/goods.model');
const path = require('path')

class GoodsService {
  async findGoods() {
    const res = await Goods.findAll({
      raw: true
    });
    return res ? res : null;
  }
  async findGoodsByBrand(goods_brand) {
    const whereOpt = {};
    goods_brand && Object.assign(whereOpt, { goods_brand })
    const res = await Goods.findAll({
      attributes: ['*'],
      where: whereOpt,
    })
    console.log(res);
    return res ? res : null;
  }
  async upload(pic) {
    const iconUrl = path.basename(pic);
  }
}

module.exports = new GoodsService();