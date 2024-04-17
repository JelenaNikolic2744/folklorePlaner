import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { UserModel } from "src/app/models/user.model";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  @Input() user: UserModel;
  @Output() userSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  selectedUser() {
    this.userSelected.emit();
  }
}
