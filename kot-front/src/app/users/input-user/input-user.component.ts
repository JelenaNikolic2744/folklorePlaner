import { Router } from '@angular/router';
import { HttpService } from './../../http-requests/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { UserModel } from 'src/app/models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-input-user',
  templateUrl: './input-user.component.html',
  styleUrls: ['./input-user.component.css'],
  providers: [DatePipe],
})
export class InputUserComponent implements OnInit {
  form: FormGroup;
  user: any;
  messageError: string = '';

  constructor(
    private http: HttpService,
    private datePipe: DatePipe,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      cityOfBirth: new FormControl(null, [Validators.required]),
      cityOfLiving: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(form: FormGroup) {
    this.addToUserModel(form.value);
    this.userService.addUser(this.user);
    this.http.inputUser(this.user).subscribe(
      (msg) => {
        this.router.navigate(['/users']);
      },
      (err) => {
        this.messageError = 'User saved';
      }
    );
  }

  addToUserModel(data) {
    this.user = {
      admin: false,
      name: data.name,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      birthday: this.dateTransformation(data.birthday),
      address: data.address,
      cityOfBirth: data.cityOfBirth,
      cityOfLiving: data.cityOfLiving,
      phone: data.phone.toString(),
      money: [],
      rehearsal: [],
    };
  }

  dateTransformation(date: number) {
    return this.datePipe.transform(date, 'dd.MM.yyyy');
  }

  onClose() {
    this.messageError = '';
  }
}
