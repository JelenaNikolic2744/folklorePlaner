import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_KEY = 'jwt';
const LOGGEDIN_KEY = 'loggedin';
const ADMIN = 'admin';
const USERNAME = 'username';

@Injectable()
export class AuthService {
  loggedChanged = new Subject<boolean>();
  adminChanged = new Subject<boolean>();
  admin: boolean;
  username: string = '';

  constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) {}

  setLogInToken(token) {
    this.localStorage.set(STORAGE_KEY, token.token);
  }

  getLogInToken() {
    return this.localStorage.get(STORAGE_KEY);
  }

  setLogging(value: boolean) {
    this.localStorage.set(LOGGEDIN_KEY, value);
    this.loggedChanged.next(this.localStorage.get(LOGGEDIN_KEY));
  }

  getLogging() {
    if (this.localStorage.get(LOGGEDIN_KEY)) {
      return this.localStorage.get(LOGGEDIN_KEY);
    }
    return false;
  }

  setAdmin(admin: any, username: string) {
    this.localStorage.set(ADMIN, admin);
    this.adminChanged.next(this.localStorage.get(ADMIN));
    this.localStorage.set(USERNAME, username);
    this.adminChanged.next(this.localStorage.get(USERNAME));
  }

  getUsername() {
    return this.localStorage.get(USERNAME);
  }

  getAdmin() {
    return this.localStorage.get(ADMIN);
  }

  removeTokenFromLocalStorage() {
    this.localStorage.remove(STORAGE_KEY);
  }

  removeAdminFromLocalStorage() {
    this.localStorage.remove(ADMIN);
    this.localStorage.remove(USERNAME);
  }

  removeLoggedInFromLocalStorage() {
    this.localStorage.remove(LOGGEDIN_KEY);
  }
}
