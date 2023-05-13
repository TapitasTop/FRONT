import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { BienvenidaComponent } from "./pages/bienvenida/bienvenida.component";
import { HomeComponent } from "./pages/home/home.component";
import { ForgotPasswordComponent } from './pages/forgotPassword/forgotPassword.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchDegustPipe } from './search-degust.pipe';
import { SearchLocalPipe } from './search-local.pipe';
import { DegustacionesValoradasComponent } from './pages/degustaciones-valoradas/degustaciones-valoradas.component';
import { MisDegustacionesComponent } from './pages/mis-degustaciones/mis-degustaciones.component';
import { NuevaDegustacionComponent } from './pages/nuevaDegustacion/nuevaDegustacion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    BienvenidaComponent,
    HomeComponent,
    ImageUploadComponent,
    RegistroComponent,
    DegustacionesValoradasComponent,
    MisDegustacionesComponent,
    PerfilComponent,
    NavbarComponent,
    SearchDegustPipe,
    SearchLocalPipe, 
    NuevaDegustacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    NgChartsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}