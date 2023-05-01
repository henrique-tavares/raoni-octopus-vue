import { apiObjectTranslator } from '@/utils/api';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://18.136.107.93:8080'
});

axios.interceptors.request.use((config) => {
  if (!config.data) {
    return config;
  }

  const translatedData = apiObjectTranslator(config.data);
  return {
    ...config,
    data: translatedData
  };
});

axios.interceptors.response.use((res) => {
  if (!res.data) {
    return res;
  }

  const translatedData = apiObjectTranslator(res.data, 'reverse');
  return {
    ...res,
    data: translatedData
  };
});

export default axios;
