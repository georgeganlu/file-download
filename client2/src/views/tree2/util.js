
export function deepCopy(data) {
    // 先判断一个这个数据的类型
    let typeofData = typeofDataSure(data);
    // 其实最终的类型只有2种，一种是简单类型， 一种是引用类型，接下来的引用类型，也只包括两种数据结构 就是对象。
    let res;
    if (typeofData === 'object') {
        res = {};
        for (let k in data) {
            res[k] = deepCopy(data[k]);
        }
        return res;
    } else if (typeofData === 'array') {
        res = [];
        data.forEach(item => {
            res.push(deepCopy(item));
        });
        return res;
    } else {
        // 除了引用类型，其它全是简单类型。
        return data;
    }
}

function typeofDataSure(data) {
    let typeObj = {
        "[object String]":'string',
        "[object Number]":'number',
        "[object Boolean]":'bool',
        "[object Null]":'null',
        "[object Undefined]":'undefined',
        "[object Object]":'object',        
        "[object Array]":'array',
        "[object Function]":'function',
        "[object RegExp]":'regex',
        "[object Date]":'date',
    }
    return typeObj[Object.prototype.toString.call(data)];
}