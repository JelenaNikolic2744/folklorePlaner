import { HttpService } from './../../../../http-requests/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-input-user-money',
  templateUrl: './input-user-money.component.html',
  styleUrls: ['./input-user-money.component.css'],
})
export class InputUserMoneyComponent implements OnInit {
  form: FormGroup;
  months: Array<string> = [
    'Januar',
    'Februar',
    'Mart',
    'April',
    'Maj',
    'Jun',
    'Jul',
    'Avgust',
    'Septembar',
    'Oktobar',
    'Novembar',
    'Decembar',
  ];
  id: number;
  userMoney: { username: string; paidYear: string; paidMonth: string };
  date = new Date().getFullYear();
  primMonths = [];

  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private location: Location
  ) {
    this.id = this.activatedRoute.parent.snapshot.params['id'];
  }

  ngOnInit() {
    this.primMonths = this.getDifferentMonths();
    this.form = new FormGroup({
      month: new FormControl(null, [Validators.required]),
    });
  }

  onInputMoney(form: FormGroup) {
    this.createUserMoney(form.value);
    this.userService.inputMoneyForUser(this.id, this.userMoney);
    this.http.inputMoney(this.userMoney).subscribe((msg) => {
      this.location.back();
    });
  }

  createUserMoney(data) {
    this.userMoney = {
      username: this.userService.getUsernameByID(this.id),
      paidMonth: data.month,
      paidYear: this.date.toString(),
    };
  }

  getDifferentMonths() {
    let prim = this.months;
    let indexOfMonth: number;
    let month: string;
    let moneyArray = this.userService.getUserMoney(this.id);
    month = moneyArray[moneyArray.length - 1];
    indexOfMonth = this.months.indexOf(month);
    prim = prim.filter((value, index) => index > indexOfMonth);
    return prim;
  }

  change(value) {
    this.form.controls['month'].setValue(value.target.value, {
      onlySelf: true,
    });
  }
}
