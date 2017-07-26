import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.interface';
import { RestService } from '../rest.service';
import { NewPassword } from "./new-password.interface";

@Injectable()
export class AuthService {

  isLoggedIn: boolean = false;
  readonly STORAGE_USER_KEY: string = 'aquapark_credentials';

  constructor(private restService: RestService, private router: Router) { }

  login(user: User) {
    return this.restService.post({ method: "login", data: {
      username: user.email,
      password: user.password
    }});
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.STORAGE_USER_KEY);
  }

  validate(): boolean {
    let userStorage = JSON.parse(localStorage.getItem(this.STORAGE_USER_KEY));
    this.isLoggedIn = !!userStorage;

    if(this.isLoggedIn) {
      this.restService.setToken(userStorage.token);
      this.restService.authPost({ method: "validate" }).subscribe(
        response => {},
        error => {
          this.logout();
          this.router.navigate(['/login']);
        }
      );
    }

    return this.isLoggedIn;
  }

  storeLogin(loginData) {
    this.isLoggedIn = true;
    this.restService.setToken(loginData.access_token);
    localStorage.setItem(this.STORAGE_USER_KEY, JSON.stringify({
      email: loginData.username,
      token: loginData.access_token
    }));
  }

  resetPassword(newPassword: NewPassword, validationCode: String) {
    return this.restService.post({ method: 'guest/resetPassword', data: {
      password: newPassword.password,
      passwordRetype: newPassword.passwordRetype,
      code: validationCode
    }});
  }

}
