import { AlertComponent } from './alert/alert.component';
import { RoutingModule } from './routing.module';
import { UsersService } from './users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RehearsalComponent } from './rehearsal/rehearsal.component';
import { DropdownDirective } from './dropdown.directive';
import { ConcertService } from './concert.service';
import { LoginComponent } from './auth/login/login.component';
import { InputConcertComponent } from './concerts/input-concert/input-concert.component';
import { ShowConcertsComponent } from './concerts/show-concerts/show-concerts.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user/user-list/user-list.component';
import { UserDetailComponent } from './users/user/user-detail/user-detail.component';
import { InputUserComponent } from './users/input-user/input-user.component';
import { InputUserMoneyComponent } from './users/user/user-detail/input-user-money/input-user-money.component';
import { HttpService } from './http-requests/http.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UpdateUserComponent } from './users/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    LoginComponent,
    RehearsalComponent,
    UserListComponent,
    UserDetailComponent,
    DropdownDirective,
    ShowConcertsComponent,
    InputConcertComponent,
    InputUserComponent,
    InputUserMoneyComponent,
    AlertComponent,
    UpdateUserComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
  ],
  providers: [
    ConcertService,
    HttpService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
