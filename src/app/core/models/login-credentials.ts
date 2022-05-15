export interface LoginCredentials {
    email: string;
    password: string;
}

export class LoginCredentials implements LoginCredentials {
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
      }
}