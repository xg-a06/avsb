import client from '@/utils/client';
import { LoginParams, User } from '@/services/types/user';

const login = (params: LoginParams): Promise<User> => {
  return client({
    url: `/v1/user/login`,
    method: 'post',
    data: params,
  });
};

const checkLogin = (): Promise<User> => {
  return client({
    url: `/v1/user/checkLogin`,
    method: 'get',
  });
};

const logout = () => {
  return client({
    url: `/v1/user/logout`,
    method: 'get',
  });
};

export { login, checkLogin, logout };
