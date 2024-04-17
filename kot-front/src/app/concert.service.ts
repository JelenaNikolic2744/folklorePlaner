import { Subject } from "rxjs";
import { ConcertModel } from "./models/concert.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ConcertService {
  concertAdded = new Subject<ConcertModel[]>();

  concerts: ConcertModel[] = [];

  getConcerts() {
    return this.concerts.slice();
  }

  addConcert(concert: ConcertModel) {
    this.concerts.push(concert);
    this.concertAdded.next(this.concerts.slice());
  }

  setConcert(concert: ConcertModel[]) {
    this.concerts = concert;
    this.concertAdded.next(this.concerts.slice());
  }
}
