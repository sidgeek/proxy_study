const Koa = require('koa');
const cors = require('@koa/cors');
const { book } = require("./routers/book")
const { data } = require("./routers/data")

const app = new Koa();

app.use(cors());

app
  .use(book.routes())
  .use(data.routes());

app.listen(3000);
