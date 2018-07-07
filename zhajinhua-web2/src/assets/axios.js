import axios from "axios";
import auth from "./auth";
import router from "../router";
import { getBaseUrl } from "./tools";

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.baseURL = getBaseUrl(window.location.href);

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = window.JSON.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.httpCode) {
      if(response.data.httpCode === "200"){
        return response;
      }else if (response.data.httpCode === '2001') {
        auth.logout()
      }else if(response.data.httpCode === '401'){
        if(window.sto){
          window.sto.close()
        }
        router.push({path: '/login'})
      }else{
        throw response.data.msg;
      }
    }
    return response;
  },
  error => {
    if (error.response) {
     
      //全局ajax错误信息提示
      //MessageBox({type:"error",message:error.response.data,title:"温馨提示",});
    }
    //return Promise.reject(error);
  });



export default axios
