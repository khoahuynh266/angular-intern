import { Role } from './role';

export class User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  phone: string;
  accessToken?: string;
  refreshToken?: string;
  roles: Role;
}
