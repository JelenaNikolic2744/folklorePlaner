import { UserModel } from './../models/user.model';
import { HttpService } from '../http-requests/http.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsersResolverService implements Resolve<UserModel[]> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.httpService.getUsers();
  }
}
