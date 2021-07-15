export class LoginRequest {
  password: string;
  username: string;

  withPassword(password: string): this {
    this.password = password;
    return this;
  }

  withUsername(username: string): this {
    this.username = username;
    return this;
  }
}
