import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { User } from '../interfaces/user';

@Injectable({
  providedIn: "root"
})

export class UsersService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: User): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }
  setToken(token: String) {
    this.cookies.set('token', token.toString());
  }
  getToken() {
    return this.cookies.get("token");
  }
  getUser() {
    return this.http.get("https://reqres.in/api/users/2");
  }
  
}
