const path = require('path')

const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsID,
  goodsQueryFailed,
} = require('../constant/err.type')

const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods,
} = require('../service/goods.service')

class GoodsController {
  async upload(ctx, next) {
   await next() 
  }

  async findAll(ctx, next) {
    try {
      const res = await findGoods();
      ctx.body = {
        code: 0,
        message: '商品查询成功',
        result: {
          data: res,
        }
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', goodsQueryFailed, ctx);
    }
  }
}

module.exports = new GoodsController();