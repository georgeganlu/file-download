import {http, synthesis} from "../lib/http";

export const url_test = "get|test1/:id/test2/:node/test3/:key";
export const api_test = function (id, node, key, data) {
    let url = synthesis(url_test, {id, node, key});
    return http(url, data);
};