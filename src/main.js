/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-12 17:04:27
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-30 17:15:21
 */
import { createApp } from 'vue'
// import App from './App.vue'
import App from './views/homeA.vue'
import router from "./router/index";

// createApp(App).mount('#app')
const app = createApp(App);
// app.use(ElementPlus);
// app.use(createPinia());
app.use(router);
// app.use(store);
app.mount("#app");