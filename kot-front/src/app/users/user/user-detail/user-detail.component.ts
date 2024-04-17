import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userDetail: UserModel;
  sub: Subscription;
  id: number;
  inputMoneyButton: boolean;

  constructor(
    private acRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.getAdmin()) {
      this.inputMoneyButton = this.authService.getAdmin();
    }
  }

  ngOnInit() {
    this.sub = this.acRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.userDetail = this.usersService.getUser(this.id);
    });
    this.sub = this.usersService.usersChanged.subscribe((user: UserModel[]) => {
      this.userDetail = this.usersService.getUser(this.id);
    });
  }

  onInputMoney() {
    this.router.navigate(['input-money'], { relativeTo: this.acRoute });
  }

  updateUser() {
    this.router.navigate(['update-user', this.id]);
  }
}
