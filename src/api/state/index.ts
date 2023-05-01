import axios from '@/plugins/axios';
import type { State } from '@/types/api';

const PATH = '/estado';

export default {
  async list() {
    return axios.get<State[]>(`${PATH}/all`);
  },
  async get(id: number) {
    return axios.get<State>(`${PATH}/${id}`);
  }
};
