const path = require('path')

const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsID,
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
    
  }
}