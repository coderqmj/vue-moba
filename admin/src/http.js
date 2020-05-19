import axios from 'axios'
import Vue from 'vue'
import router from './router/index'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(function (config) {
  if(localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token 
  }
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$message.error(err.response.data.message)
  if(err.response.status === 401) {
    // console.log('login')
    router.push('/login')
  }
  return Promise.reject(err)
})
export default http