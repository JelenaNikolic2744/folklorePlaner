import { Component } from '@angular/core';
import { HttpService } from './http-requests/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'koturovic';
  constructor(private http: HttpService) {
    //this.http.getUsers().subscribe();
  }
}
