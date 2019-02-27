import axios from 'axios';
export default (Vue) => {
    let instances = axios.create({
        baseURL: 'http://172.19.23.127:3009',
        
    });
    Vue.prototype.$http = instances;
}

