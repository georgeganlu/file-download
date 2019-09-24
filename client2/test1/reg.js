let url = "get-/test1/:id/test2/:node/test3/:key/:key3/:key6";

let reg = /:([a-zA-Z0-9]{1,})/g;

let newUrl = url.replace(reg, function(node, node1) {
    console.log(node);
    let code = encodeURIComponent(node1);
    console.log(code);
    return "3";
});

console.log(newUrl);

