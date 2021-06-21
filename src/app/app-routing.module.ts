import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResigterComponent } from './components/resigter/resigter.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UserComponent } from './components/user/list-user/user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './model/role';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent, },
  { path: 'resigter', component: ResigterComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] ,   data: { roles: [Role.Admin] }},
  { path: 'user/add', component: AddUserComponent, canActivate: [AuthGuard],  data: { roles: [Role.Admin] } },
  { path: 'user/update/:id', component: UpdateUserComponent, canActivate: [AuthGuard],  data: { roles: [Role.Admin]}  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'changePassword', component: ChangePasswordComponent,canActivate: [AuthGuard]  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
