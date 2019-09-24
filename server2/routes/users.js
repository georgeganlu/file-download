const router = require('koa-router')();

const fs = require("fs");
const path = require("path");

router.prefix('/users');
router.get('/', function (ctx, next) {
  console.log(ctx.request.query, "这里是get的请求参数");  
  ctx.body = {
      test:"george-get",
      test2: "alex-get"
  }
});

router.post('/', function (ctx, next) {
    console.log(ctx.request.body, "body的内容是什么");
    // 只区分字符串的编码方式 ----》常用的是二种 一种urlencoded 一种json.
    // console.log(ctx.request.params, "body的内容是什么");
    // console.log(typeof ctx.request.body);
    ctx.body = {
        test:"george-post",
        test2: "alex-post"
    }
});


router.get("/img", async (ctx, next) => {
    let path1 = path.join(__dirname, "../public/images/1.jpg");
    let data = fs.readFileSync(path1);
    ctx.body = data;
});


router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
