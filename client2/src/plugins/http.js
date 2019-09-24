// 这里的http不做具休的工作了,只是把结果带回去-- promise的一环扣一环。
function http(api, ...datas) {
    return new Promise((succ, fail) => {
          let resApi = null;
          if (typeof api === "function") {
              resApi = api.apply(api, datas);
          } else if (typeof api === "object") {

          }
    });
}
export default function (Vue, options) {
    Vue.http = http;
    window.http = http;
    Object.defineProperties(Vue.prototype, {
        $http1:{
            get() {
                return http;
            }
        },
        http1: {
            get() {
                return http;
            }
        }
    })
}