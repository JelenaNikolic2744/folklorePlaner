import { HttpService } from './../../http-requests/http.service';
import { ConcertModel } from './../../models/concert.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConcertService } from 'src/app/concert.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-concert',
  templateUrl: './input-concert.component.html',
  styleUrls: ['./input-concert.component.css'],
  providers: [DatePipe],
})
export class InputConcertComponent implements OnInit {
  form: FormGroup;
  concert: ConcertModel;
  error: boolean = false;
  messageError: string = '';

  constructor(
    private concertService: ConcertService,
    private datePipe: DatePipe,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      departure: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    this.addToUserModel(form.value);
    this.concertService.addConcert(this.concert);
    this.http.inputConcert(this.concert).subscribe(
      (msg) => {
        console.log(msg);
        this.router.navigate(['show-concerts']);
      },
      (err) => {
        console.log(err);
        //varanje
        this.messageError = 'Concert saved';
      }
    );
  }

  addToUserModel(data) {
    this.concert = {
      date: this.dateTransformation(data.date),
      startTime: data.startTime,
      place: data.place,
      city: data.city,
      departure: data.departure,
    };
  }
  dateTransformation(date: number) {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }

  onClose() {
    this.messageError = '';
  }
}
