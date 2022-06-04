const Koa = require('koa');
const { book } = require("./routers/book")
const { data } = require("./routers/data")

const app = new Koa();

app
  .use(book.routes())
  .use(data.routes());

app.listen(3000);
