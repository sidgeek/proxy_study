const Router = require('koa-router')

const router = new Router()

router.get('/data', (ctx, next) => {
  ctx.body = {
    data: { key: 'data' },
  }
})

module.exports = {
  data: router
}