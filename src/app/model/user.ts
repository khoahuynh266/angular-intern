import { Role } from './role';

export class User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  phone: string;
  accesToken?: string;
  refreshToken?: string;
  roles: Role;
}
