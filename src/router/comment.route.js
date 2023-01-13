const Router = require('koa-router');

const router = new Router({prefix: '/comment'});

router.post('/', (ctx, next) => {});

module.exports = router;