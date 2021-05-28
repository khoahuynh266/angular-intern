export class SignUpData {
  private email: string;
  private password: string;
  private fullname: string;
  private phone: string;


  constructor(email: string, password: string, fullname: string, phone: string){
    this.email = email;
    this.password =password;
    this.fullname = fullname;
    this.phone = phone;
  }

  // constructor(email: string, password: string, fullname: string){
  //   this.email = email;
  //   this.password =password;
  //   this.fullname = fullname;
  // }
  getEmail() :string{
    return this.email;
  }
  getPassword() :string{
    return this.password;
  }
  getName() :string{
    return this.fullname;
  }
  getPhone() : string{
    return  this.phone;
  }
}
