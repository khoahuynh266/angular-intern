import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResigterComponent } from './components/resigter/resigter.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: '', component: HomeComponent ,canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent,canLoad: [AuthGuard] },
    { path: 'resigter', component: ResigterComponent,canActivateChild: [AuthGuard] },
    {path : 'user', component :UserComponent},
    {path : 'profile', component : ProfileComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
