const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors');

const index = require('./routes/index')
const users = require('./routes/users')
const koaBody = require('koa-body');
const path = require("path");
// error handler
onerror(app);

app.use(cors());

// middlewares

// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text'],   
// }))

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        uploadDir: 'disk',
    },
    jsonLimit:"50mb",
    textLimit:"50mb",
    formLimit:"50mb"
}))


app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname + '/public')));

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app