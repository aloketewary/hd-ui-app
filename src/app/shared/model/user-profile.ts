export class UserProfile {
  accessToken: string;
  email: string;
  id: string;
  roles: Array<Roles>;
  tokenType: string;
}

export class LoginResponse {
  accessToken: string;
  email: string;
  id: string;
  roles: Array<Roles>;
  tokenType: string;
}

export class Roles {
  id: string;
  name: string;
}
