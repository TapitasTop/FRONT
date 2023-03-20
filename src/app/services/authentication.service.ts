import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000'; // replace with your API URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, {
      username: username,
      password: password,
    });
  }
}
