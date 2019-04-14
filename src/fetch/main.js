import Vue from 'vue';
import format from 'string-format';
import arrurl from '../map/array_format_url';
import objurl from '../map/obj_format_url';
import request from './requerst';

let baseURL = `${document.location.origin}/api`;
if (process.env.NODE_ENV === 'development') baseURL = 'http://acm.nankai.edu.cn/api';

const aget = async function AwaitHttpGet(api) {
  const res = await request(baseURL + api);
  if (res.code !== 0) {
    throw res;
  }
  return res.data;
};

const apost = async function AwaitHttpPost(api, body) {
  const res = await request(baseURL + api, {
    body,
    method: 'POST',
  });
  if (res.code !== 0) {
    throw res;
  }
  return res.data;
};

const objpost = function ApiPost(api, obj, body) {
  return apost(format(objurl[api], obj), body);
};

const arrapi = function ApiParamsArray(api, arr) {
  return aget(format(arrurl[api], ...arr));
};

const objapi = function ApiParamsObject(api, obj) {
  return aget(format(objurl[api], obj));
};

const url = function GetApiUrlFromObjFormat(api) {
  return objurl[api];
};

Vue.prototype.$http = {};
Vue.prototype.$http.fetch = fetch;
Vue.prototype.$http.aget = aget;
Vue.prototype.$http.apost = apost;
Vue.prototype.$http.api = objapi;
Vue.prototype.$http.arrapi = arrapi;
Vue.prototype.$http.objpost = objpost;

export {
  aget,
  objapi,
  url,
};
