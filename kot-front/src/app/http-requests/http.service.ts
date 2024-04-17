import { UsersService } from './../users.service';
import { HttpClient } from '@angular/common/http';
import { ConcertModel } from '../models/concert.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ConcertService } from '../concert.service';
import { UserModel } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private concertService: ConcertService,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  getConcerts() {
    return this.http.get<ConcertModel[]>('http://localhost:3000/concerts').pipe(
      tap((concerts) => {
        this.concertService.setConcert(concerts);
      })
    );
  }

  inputConcert(concert: ConcertModel) {
    return this.http.post<ConcertModel>(
      'http://localhost:3000/concerts',
      concert
    );
  }

  getUsers() {
    return this.http.get<UserModel[]>('http://localhost:3000/users').pipe(
      tap((users) => {
        this.userService.setUsers(users);
      })
    );
  }

  inputUser(user: UserModel) {
    return this.http.post<UserModel>('http://localhost:3000/users', user);
  }

  updateUser(user: UserModel) {
    return this.http.put<UserModel>('http://localhost:3000/users', user);
  }

  inputMoney(money) {
    return this.http.post('http://localhost:3000/users/money', money, {
      responseType: 'text',
    });
  }

  inputRehearsal(rehearsal) {
    return this.http.post('http://localhost:3000/users/rehearsal', rehearsal, {
      responseType: 'text',
    });
  }

  login(login: { username: string; password: string }) {
    return this.http.post('http://localhost:3000/auth', login).pipe(
      tap((data) => {
        this.authService.setLogInToken(data);
      })
    );
  }
}
