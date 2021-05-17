import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ResigterComponent } from './components/resigter/resigter.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    { path: '', component: HomeComponent ,canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'resigter', component: ResigterComponent },
    {path : 'accounts', component :AccountComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
