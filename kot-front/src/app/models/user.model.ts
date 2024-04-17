import { RehearsalModel } from './rehearsal.model';
import { MoneyModel } from './money.model';
export class UserModel {
  admin: boolean;
  username: string;
  name: string;
  lastname: string;
  birthday: string;
  address: string;
  cityOfBirth: string;
  cityOfLiving: string;
  phone: string;
  money: MoneyModel[];
  rehearsal: RehearsalModel[];

  constructor(
    admin: boolean,
    username: string,
    name: string,
    lastname: string,
    birthday: string,
    address: string,
    cityOfBirth: string,
    cityOfLiving: string,
    phone: string,
    money: MoneyModel[],
    rehearsal: RehearsalModel[]
  ) {
    this.admin = admin;
    this.username = username;
    this.name = name;
    this.lastname = lastname;
    this.birthday = birthday;
    this.address = address;
    this.cityOfBirth = cityOfBirth;
    this.cityOfLiving = cityOfLiving;
    this.phone = phone;
    this.money = money;
    this.rehearsal = rehearsal;
  }
}
