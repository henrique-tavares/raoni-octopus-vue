import axios from '@/plugins/axios';
import type { Page, User } from '@/types/api';

const PATH = '/usuario';

export default {
  async create(user: User) {
    return axios.post<User>(PATH, user);
  },
  async list(page: number, search?: string) {
    if (search) {
      return axios.get<Page<User>>(`${PATH}/buscar`, {
        params: {
          page,
          valor: search
        }
      });
    }

    return axios.get<Page<User>>(`${PATH}/p`, {
      params: {
        page
      }
    });
  },
  async get(userId: number) {
    return axios.get<User>(`${PATH}/${userId}`);
  },
  async remove(userId: number) {
    return axios.delete<void>(`${PATH}/${userId}`);
  }
};
