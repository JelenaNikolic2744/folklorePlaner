import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { HttpService } from './../../http-requests/http.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  messageError: string = '';
  dataForLogin: any;
  constructor(
    private http: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.setLogging(false);
  }

  onClose() {
    this.messageError = '';
  }

  login(form: NgForm) {
    const username = form.value.username;
    this.http.login(form.value).subscribe(
      (msg) => {
        this.dataForLogin = msg;
        this.authService.setAdmin(this.dataForLogin.admin, username);
        if (this.dataForLogin.isItGood) {
          this.authService.setLogging(true);

          this.router.navigate(['/users']);
        } else {
          this.authService.removeAdminFromLocalStorage();
          this.messageError = 'Wrong password';
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.messageError = error.error.message;
      }
    );
    form.reset();
  }
}
