export interface LoggedUser {
    email: string,
    token: string
}

export class LoggedUser implements LoggedUser {
    constructor(email: string, token: string) {
      this.email = email;
      this.token = token;
    }
}