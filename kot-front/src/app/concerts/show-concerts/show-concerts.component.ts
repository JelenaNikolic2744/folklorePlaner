import { HttpService } from "./../../http-requests/http.service";
import { Subscription } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { ConcertModel } from "src/app/models/concert.model";
import { ConcertService } from "src/app/concert.service";

@Component({
  selector: "app-show-concerts",
  templateUrl: "./show-concerts.component.html",
  styleUrls: ["./show-concerts.component.css"],
})
export class ShowConcertsComponent implements OnInit {
  concerts: ConcertModel[] = [];
  sub: Subscription;

  constructor(
    private concertService: ConcertService
  ) {}

  ngOnInit() {
    this.concerts = this.concertService.getConcerts();
    this.sub = this.concertService.concertAdded.subscribe(
      (concerts: ConcertModel[]) => {
        this.concerts = concerts;
      }
    );
  }
}
