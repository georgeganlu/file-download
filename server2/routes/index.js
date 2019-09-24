const router = require('koa-router')()
const path = require("path");
const fs = require("fs");

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/fileUpload', async (ctx, next) => {
    console.log(ctx.request.body);    
    console.log(ctx.request.files.file);
    ctx.body = {
        "upload":"test",
    }
});

router.post('/fileBase64', async (ctx, next) => {
    let str = ctx.request.body.data;
    ctx.body = {
        data: str,
    };
    // let bufferStr = new Buffer(str, 'base64');  
    // let path1 = path.join(__dirname, '../disk/1.jpg');
    // fs.writeFileSync(path1, bufferStr);
    // ctx.body = {
    //     "upload":"test",
    // }
});

module.exports = router;
