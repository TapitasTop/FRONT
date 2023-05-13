import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { ForgotPasswordComponent } from './pages/forgotPassword/forgotPassword.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NuevaDegustacionComponent } from './pages/nuevaDegustacion/nuevaDegustacion.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'forgotPassword', component: ForgotPasswordComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'nuevaDegustacion', component: NuevaDegustacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  [x: string]: any;
}
