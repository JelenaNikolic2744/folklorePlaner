import { UserModel } from './models/user.model';
import { MoneyModel } from './models/money.model';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private authService: AuthService) {}

  authChanged = new Subject<boolean>();
  usersChanged = new Subject<UserModel[]>();

  users: any = [];

  setUsers(users: UserModel[]) {
    if (this.authService.getAdmin()) {
      this.users = users;
    } else {
      const username = this.authService.getUsername();
      this.users = [];
      this.users = this.clearUsers(users, username);
    }
    this.usersChanged.next(this.users.slice());
  }

  clearUsers(users, username) {
    const user = users.filter((user) => user.username === username);
    return user;
  }

  inputMoneyForUser(id: number, money: MoneyModel) {
    this.users[id].money.push(money);
    this.usersChanged.next(this.users.slice());
  }

  getUserMoney(id: number) {
    let monthOfUser = [];

    for (let pr of this.users[id].money) {
      monthOfUser.push(pr.paidMonth);
    }
    return monthOfUser;
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(id: number) {
    return this.users[id];
  }

  addUser(user: UserModel) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  getUsernameByID(id: number) {
    return this.users[id].username;
  }
}
