export class SignUpData {
  private username: string;
  private password: string;
  private fullname: string;
  private phone: string;

  constructor(
    username: string,
    password: string,
    fullname: string,
    phone: string
  ) {
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.phone = phone;
  }

  // constructor(username: string, password: string, fullname: string){
  //   this.usernclame = username;
  //   this.password =password;
  //   this.fullname = fullname;
  // }
  getUsername(): string {
    return this.username;
  }
  getPassword(): string {
    return this.password;
  }
  getName(): string {
    return this.fullname;
  }
  getPhone(): string {
    return this.phone;
  }
}
