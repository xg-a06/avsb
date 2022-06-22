import axios from 'axios';

// 默认实例
const client = axios.create({
  baseURL: process.env.API_PATH,
  timeout: process.env.TIME_OUT,
  validateStatus: (status) => status < 500, // 配合后端小于500不算请求失败
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
client.interceptors.request.use((config) => {
  // 根据情况自定义，如请求头发送token、展示loading
  return config;
});

// 响应拦截器
client.interceptors.response.use(
  (res) => {
    // 根据情况做统一的错误处理，或后处理如隐藏loading
    return res.data.data;
  },
  (err) => {
    // err.response.status 500情况
    return Promise.reject(err);
  }
);

export default client.request;
