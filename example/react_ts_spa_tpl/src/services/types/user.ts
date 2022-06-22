export interface User {
  name: string;
  role: number;
  status: number;
  userId: number;
  isFirstLogin: number;
}

export interface LoginParams {
  name: string;
  password: string;
}
