import axios from '@/plugins/axios';
import type { City } from '@/types/api';

const PATH = '/cidade';

export default {
  async get(stateId: number) {
    return axios.get<City[]>(`${PATH}/uf`, {
      params: {
        idUF: stateId
      }
    });
  }
};
