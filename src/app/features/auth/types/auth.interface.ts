export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthData {
  user: User;
  access_token: string;
}