export class UserOutputDto {
  private id: number;
  private userId: string;
  private password: string;

  get _id() {
    return this.id;
  }

  get _password() {
    return this.password;
  }
}
