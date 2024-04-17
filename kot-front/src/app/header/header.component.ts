import { AuthService } from './../auth/auth.service';
import { HttpService } from './../http-requests/http.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loggedIn = false;
  admin: boolean;
  adminSub: Subscription;

  constructor(
    private http: HttpService,
    private router: Router,
    private authService: AuthService
  ) {
    this.admin = this.authService.getAdmin();
  }

  ngOnInit() {
    this.loggedIn = this.authService.getLogging();
    this.admin = this.authService.getAdmin();
    this.sub = this.authService.loggedChanged.subscribe((log) => {
      this.admin = this.authService.getAdmin();
      this.loggedIn = log;
    });
  }

  showConcerts() {
    this.http.getConcerts().subscribe();
    this.router.navigate(['/show-concerts']);
  }

  onLogout() {
    this.authService.removeTokenFromLocalStorage();
    this.authService.removeLoggedInFromLocalStorage();
    this.authService.removeAdminFromLocalStorage();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
