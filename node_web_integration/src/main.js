/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:04:27
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-03 11:05:32
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index";
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");