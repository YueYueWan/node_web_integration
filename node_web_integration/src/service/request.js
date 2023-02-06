/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-02-01 17:43:12
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-01 17:45:47
 */
import { ElMessage } from "element-plus";
import axios from "axios";
// import { useRouter } from "vue-router";
const Message = (txt) => {
  ElMessage.error(txt);
};
// const router = useRouter();
const service = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    // console.log("QQQQQQQQQQQQQQQ", config);
    // do something before request is sent
    return config;
    // config.headers["Access-Token"] = "";
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    console.log("res==========", response);
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message("接口请求报错，请稍后重试~");

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // MessageBox.confirm(
        //   "You have been logged out, you can cancel to stay on this page, or log in again",
        //   "Confirm logout",
        //   {
        //     confirmButtonText: "Re-Login",
        //     cancelButtonText: "Cancel",
        //     type: "warning",
        //   }
        // ).then(() => {
        //   // store.dispatch("user/resetToken").then(() => {
        //   //   location.reload();
        //   // });
        // });
      }
      return res.msg || "error";
      // return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message(error || "接口请求报错，请稍后重试~");
    // return Promise.reject(error);
    return error;
  }
);

export default service;
