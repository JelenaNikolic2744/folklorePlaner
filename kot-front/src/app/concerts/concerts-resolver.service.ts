import { HttpService } from "./../http-requests/http.service";
import { ConcertModel } from "src/app/models/concert.model";
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class ConcertResolverService implements Resolve<ConcertModel[]> {
  constructor(private httpService: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.httpService.getConcerts();
  }
}
