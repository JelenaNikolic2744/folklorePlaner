import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];
  sub: Subscription;

  constructor(private userService: UsersService, private router: Router) {
    this.users = this.userService.getUsers();
  }

  ngOnInit() {
    this.sub = this.userService.usersChanged.subscribe((users: UserModel[]) => {
      this.users = users;
    });
  }

  getSelectedUser(userID: number) {
    this.router.navigate(['/user-details', userID]);
  }
}
