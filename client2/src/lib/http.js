export const http = function (url, data, header = { contentType: "application/json"}) {
    // 1. 使用fetch来封装API
    // 2. url里面包含了请求方法和api
    // 3. data里面是请求的数据
    // 4. header里面是请求头的内容
    // 过来的内容限定为 url(包含method请求方法) data包含的是数据 header包含的是传过来的请求头的内容。    
    let methodApi = url.split("|");
    const method = methodApi[0];
    const URL = methodApi[1];
    if (!method) {
        method = "GET";
    }
    if (!URL) {
        throw new Error(`no found url ${URL}`);;
        return
    }
    // 有了url
    return new Promise((succ, fail) => {
        // fetch API请求的时候 如果默认是json的话。
           
    });
};

// get-/test1/:id/test2/:node/test3/:key
export const synthesis = function(url, options) {
    // 替换的正则表达式。
    let reg = /:([a-zA-Z0-9]{1,})/g;
    return url.replace(reg, function(node, node1) {
        if (!node1) {
            throw new Error(`no found ${node1} url`);
        }
        return encodeURIComponent(options[node1]);
    })
};