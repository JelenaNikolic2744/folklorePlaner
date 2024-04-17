import { ConcertResolverService } from './concerts/concerts-resolver.service';
import { InputUserMoneyComponent } from './users/user/user-detail/input-user-money/input-user-money.component';
import { RehearsalComponent } from './rehearsal/rehearsal.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { ShowConcertsComponent } from './concerts/show-concerts/show-concerts.component';
import { InputConcertComponent } from './concerts/input-concert/input-concert.component';
import { UserComponent } from './users/user/user.component';
import { UserDetailComponent } from './users/user/user-detail/user-detail.component';
import { InputUserComponent } from './users/input-user/input-user.component';
import { UsersResolverService } from './users/users-resolver.service';
import { AuthGuard } from './auth/auth.guard';
import { UpdateUserComponent } from './users/update-user/update-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'users',
    component: UserComponent,
    resolve: [UsersResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
    resolve: [UsersResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: 'input-user',
    component: InputUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details/:id',
    component: UserDetailComponent,
    resolve: [UsersResolverService],
    children: [
      {
        path: 'input-money',
        component: InputUserMoneyComponent,
        canActivate: [AuthGuard],
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'show-concerts',
    component: ShowConcertsComponent,
    resolve: [ConcertResolverService],
    canActivate: [AuthGuard],
  },
  {
    path: 'input-concert',
    component: InputConcertComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rehearsal',
    component: RehearsalComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
