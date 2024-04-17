import { Router } from '@angular/router';
import { HttpService } from './../http-requests/http.service';
import { UserModel } from './../models/user.model';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rehearsal',
  templateUrl: './rehearsal.component.html',
  styleUrls: ['./rehearsal.component.css'],
  providers: [DatePipe],
})
export class RehearsalComponent implements OnInit {
  users: UserModel[] = [];
  userNameAndLastname: Array<{
    username: string;
    name: string;
    lastname: string;
    isChecked: boolean;
  }> = [];
  rehearsal: Array<{
    username: string;
    date: string;
    attendance: string;
  }> = [{ username: 'jeca', attendance: 'bila', date: '22.01.2020' }];

  messageError: string = '';

  constructor(
    private usersService: UsersService,
    private datePipe: DatePipe,
    private http: HttpService,
    private router: Router
  ) {
    this.users = this.usersService.getUsers();

    this.separateRehearsalFromUsers(this.users);
  }

  separateRehearsalFromUsers(users: UserModel[]) {
    for (let u of users) {
      this.userNameAndLastname.push({
        username: u.username,
        name: u.name,
        lastname: u.lastname,
        isChecked: false,
      });
    }
  }

  submit(f: NgForm) {
    if (this.rehearsal.length == 0) {
      this.fillRehearsal();
    } else {
      this.rehearsal = [];
      this.fillRehearsal();
    }
    this.http.inputRehearsal(this.rehearsal).subscribe(
      (msg) => {
        console.log(msg);
        this.router.navigate(['/users']);
      },
      (err) => {
        console.log(err);
        this.messageError = err.error.substring(23, 49);
      }
    );
  }

  getDate() {
    let date = new Date().toLocaleDateString();
    date = this.datePipe.transform(date, 'EEEE,d MMMM,y');
    let stringDate = date.toString();
    return stringDate;
  }

  fillRehearsal() {
    for (let user of this.userNameAndLastname) {
      if (user.isChecked == true) {
        this.rehearsal.push({
          username: user.username,
          date: this.getDate(),
          attendance: 'prisustvovao/la',
        });
      } else {
        this.rehearsal.push({
          username: user.username,
          date: this.getDate(),
          attendance: 'nije prisustvovao/la',
        });
      }
    }
  }

  ngOnInit() {}

  onClose() {
    this.messageError = '';
  }
}
