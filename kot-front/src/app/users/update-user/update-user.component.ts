import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../http-requests/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  form: FormGroup;
  user: any;
  messageError: string = '';
  userId: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
    this.form = new FormGroup({
      lastname: new FormControl(null),
      address: new FormControl(null),
      cityOfLiving: new FormControl(null),
      phone: new FormControl(null),
    });
  }

  onSubmit(form: FormGroup) {
    this.addToUserModel(form.value);
    this.http.updateUser(this.user).subscribe(
      (msg) => {
        this.router.navigate(['/users']);
      },
      (err) => {
        this.messageError = err.error.error;
      }
    );
  }

  addToUserModel(data) {
    if (data.phone) {
      this.user = {
        username: this.userService.getUsernameByID(this.userId),
        lastname: data.lastname,
        address: data.address,
        cityOfLiving: data.cityOfLiving,
        phone: data.phone.toString(),
      };
    } else {
      this.user = {
        username: this.userService.getUsernameByID(this.userId),
        lastname: data.lastname,
        address: data.address,
        cityOfLiving: data.cityOfLiving,
      };
    }
  }

  onClose() {
    this.messageError = '';
  }
}
