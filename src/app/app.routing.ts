import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: '', component: BienvenidaComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'forgotPassword', component: ForgotPasswordComponent, pathMatch: 'full' }
];
export const routing = RouterModule.forRoot(appRoutes);
