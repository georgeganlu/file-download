
1. 用node 实现文件流下载。
2. 用a标签实现下载。
3. 还有一种使用ajax blod解析下载文件。

分别进入client 和 server端 进行npm install

修对对应的client 和 server端的ip地址。

后台主要的2种返回方式

1. 一种是使用stream的形式, 让前台直接实现下载, 不管是a标签点击还是ajax的请求，都是形成url直接访问后台的流文件实现下载。
2. 后台返回二进制的数据,前台使用ajax获取后数据后, 用Blob对象读取之后，在通过URL生成在内存中的下载地址。 


 // var blob = new Blob(['Hello World 234234234234sdfadf']);
        // var a = document.createElement('a');
        // a.href = window.URL.createObjectURL(blob);
        // a.donwload = 'hello-world.docx';
        // a.textContent = 'Download Hello World';
        // document.body.appendChild(a);
        // var reader = new FileReader();
        // reader.readAsArrayBuffer(file);
        // reader.onload = function (e) {
        //     console.log(e.target.result.toString());
        // }
        document.getElementById('btn').addEventListener('click', () => {
            let file = document.getElementById('test1').files[0];
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(file);
            a.donwload = 'hello-world.docx';
            a.textContent = 'Download Hello World';
            document.body.appendChild(a);
        }, false)