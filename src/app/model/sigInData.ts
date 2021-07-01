export class SignInData {
  private username: string;
  private password: string;
  private isRemember: boolean

  constructor(username: string, password: string, isremember: boolean) {
    this.username = username;
    this.password = password;
    this.isRemember = isremember;
  }
  getUsername() : string {
    return this.username;
  }
  getPassword() : string {
    return this.password;
  }
  getRemember() : boolean{
    return this.isRemember;
  }
}
