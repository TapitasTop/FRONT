import { routing } from "./app.routing";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { HomeComponent } from "./home/home.component";
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    BienvenidaComponent,
    HomeComponent
  ],
  imports: [BrowserModule, routing, FormsModule, HttpClientModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
