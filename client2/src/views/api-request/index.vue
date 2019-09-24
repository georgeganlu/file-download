<template>
	<div>
		<img :src="myImage" alt />
        <br>
        <div>
            <span>文件上传formData的方式</span>
            <input type="file" @change="upload">
        </div>
        <hr>
        <div>
            <span>base64的上传</span>
            <input type="file" @change="uploadBase">
            <br>
            <img  :src="baseImg" alt="">
        </div>
        <div>
            <pre>{{msg3}}</pre>
        </div>

        <hr>
        <button @click="download4">文件下载--fetch</button>
        <hr>
        <button @click="download5">文件下载--axios</button>
	</div>
</template>

<script>
import { url_test, api_test } from "../../api/request-test1";
export default {
	data() {
		return {
            myImage: "",
            baseImg:'',
            msg3: "msg  16%     15",
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			// this.$http1(api_test, 5, 6, 7, {name:"hello george"});
			let url = "http://172.19.23.127:3000/users?wd=george&pd=alex";
			let urlimg = "http://172.19.23.127:3000/images/1.jpg";
			let urlimgapi = "http://172.19.23.127:3000/users/img";

			let urltest =
				"http://172.18.8.242/nfs/upload/logistics_payment_apply/027f052442a7d933f7a95797a34bd11372f00118_20190823105549.jpg";
			let params = {
				name: "george",
				key: "alex"
			};
			// fetch(urlimg, {
			// 	// body: JSON.stringify(params), // must match 'Content-Type' header
			// 	// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			// 	// credentials: "same-origin", // include, same-origin, *omit
			// 	headers: {
			// 		// "user-agent": "Mozilla/4.0 MDN Example",
			// 		// "content-type": "application/json"
			// 	},
			// 	method: "get", // *GET, POST, PUT, DELETE, etc.
			// 	mode: "cors", // no-cors, cors, *same-origin
			// 	// redirect: "follow", // manual, *follow, error
			// 	// referrer: "no-referrer" // *client, no-referrer
			// }).then(res => {
			//     return res.blob();
			// }).then(res => {
			//     console.log(res);
			//     var objectURL = URL.createObjectURL(res);
			//     var a = document.createElement('a');
			//     a.href = objectURL;
			//     a.download = '1.jpg';
			//     document.body.appendChild(a);
			//     a.click();
			//     document.body.removeChild(a);
			// });

			let url2 = "http://172.19.23.127:3000/users";
			let params2 = {
				name: "george",
				key: "alex"
			};
			// 只区分字符串的编码方式 ----》常用的是二种 一种urlencoded 一种json.
			let params3 = "name=george&name1=alex";
			fetch(url2, {
				// body: JSON.stringify(params3), // must match 'Content-Type' header
				body: "name=george&name1=alex",
				// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
				// credentials: "same-origin", // include, same-origin, *omit
				headers: {
					// "user-agent": "Mozilla/4.0 MDN Example",
					"content-type": "application/x-www-form-urlencoded"
					// "content-type": "application/json"
				},
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "cors" // no-cors, cors, *same-origin
				// redirect: "follow", // manual, *follow, error
				// referrer: "no-referrer" // *client, no-referrer
			})
				.then(res => {
					return res.json();
				})
				.then(res => console.log(res));
        },
        upload(e) {
            let file = e.target.files[0];
            debugger;
            let formData = new FormData();
            formData.append("file", file);
            formData.append("name", file.name);
            let url = "http://172.19.23.127:3000/fileUpload";
            fetch(url, {
                mode: "cors",
                method: "POST",
                body: formData,
                headers: {
                    name: "george",
                    // "content-type": "multipart/form-data"
                }
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log(res);
            })            
        },
        requestHttp(url, data) {
           return fetch(url, {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({data: data}),
                headers: {
                    name: "george",
                    "content-type": "application/json"
                }
            }).then(res => {
                return res.json();
            }).then(res => {
                return res;
            })
        },
        uploadBase(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                let result = reader.result;
                let url = "http://172.19.23.127:3000/fileBase64";
                this.requestHttp(url, result).then(res => {
                    this.baseImg = res.data;
                });
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        },

        // 直接下载服务器上的图片。
        download4() {
            let url = "http://172.19.23.127:3000/images/2.jpg";
            let url2 = `http://172.18.8.245:81/nfs/upload/logistics_payment_apply/60A22BC7-C774-4edb-8146-A30357ACD86C_20190924094635.png`;
            fetch(url2).then(res => {
                console.log(res);   
                return res.blob();         
            }).then(res => {
                let a = document.createElement("a");
                a.download = "1.jpg";
                let url2 = URL.createObjectURL(res);
                a.href = url2 ;
                document.body.appendChild(a);
                a.click();            
                document.body.removeChild(a);            
            });            
        },

        download5() {
            let url = "http://172.19.23.127:3000/images/2.jpg";
            let url2 = `http://172.18.8.245:81/nfs/upload/logistics_payment_apply/60A22BC7-C774-4edb-8146-A30357ACD86C_20190924094635.png`;
            // axios选择接收的content-type -- application/json 本质是一种字符串 需要明确设置响应回来的数据类型。
            // 第种请求头对应的数据的不同 application/json  
            this.axios(url2, {responseType: 'blob'}).then(res => {
                // console.log(res);
                let a = document.createElement("a");
                a.download = "1.jpg";
                let url2 = URL.createObjectURL(res.data);
                a.href = url2 ;
                document.body.appendChild(a);
                a.click();            
                document.body.removeChild(a);   
            });           
        }

	}
};
</script>