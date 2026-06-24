import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/request/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userLoggedIn = localStorage.getItem('token') ? true : false;
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  login(request: LoginRequest) {
    return this.http.post<any>(
      this.apiUrl+'auth/login',
      request
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token')?true:false;
  }
}
