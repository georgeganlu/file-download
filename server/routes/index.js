var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
let {promisify} = require('util');

/* GET home page. */
router.get('/downloadSingle', function(req, res, next) {
  var currDir = path.normalize(req.query.dir),
  fileName = req.query.name + `.xlsx`,
  currFile = `public`+ "\\" + `track_17.xlsx`,
  fReadStream;
  let filepath = path.join(__dirname, '..', 'public/track_17.xls');
  console.log(`asdfasdfadf`, filepath);

  fs.exists(filepath, function(exist) {
    if(exist){
        res.set({
            "Content-type":"application/octet-stream",
            "Content-Disposition":"attachment;filename="+encodeURI(fileName)
        });
        fReadStream = fs.createReadStream(filepath);  // 通过fs读取成流文件。
        // promisify()

        fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
        fReadStream.on("end",function () {
            res.end();
        });
    }else{
        res.set("Content-type","text/html");
        res.send("file not exist!");
        res.end();
    }
  });
});

router.get('/download', (req, res, next) => {
  console.log('asefasdf3a54sd2f1a2s1d5f2a5sdf');
  let filepath = path.join(__dirname, '..', 'public/track_17.xls');
  let fileBuffer = fs.readFileSync(filepath);  // 返回的是文件流文件。
  res.header({
    "content-type":'blob'
  });
  res.send(fileBuffer);
});

module.exports = router;
