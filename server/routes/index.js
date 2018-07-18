var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/downloadSingle', function(req, res, next) {
  var currDir = path.normalize(req.query.dir),
  fileName = req.query.name + `.xlsx`,
  currFile = `public`+ "\\" + `asdf.xlsx`,
  fReadStream;
  fs.exists(currFile,function(exist) {
    if(exist){
        res.set({
            "Content-type":"application/octet-stream",
            "Content-Disposition":"attachment;filename="+encodeURI(fileName)
        });
        fReadStream = fs.createReadStream(currFile);
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

module.exports = router;
