import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/request/login-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = environment.apiUrl;

  private token = signal<string | null>(localStorage.getItem('token'));
  private refreshToken = signal<string | null>(
    localStorage.getItem('refresh-token')
  );

  isLoggedIn = computed(() => !!this.token());

  login(request: LoginRequest) {
    return this.http.post<any>(
      `${this.apiUrl}auth/login`,
      request
    );
  }

  refreshAccessToken() {

    return this.http.post<any>(
      `${this.apiUrl}auth/refresh-token`,
      {
        refreshToken: this.refreshToken()
      }
    );
  }

  saveTokens(accessToken: string, refreshToken: string) {

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);

    this.token.set(accessToken);
    this.refreshToken.set(refreshToken);
  }

  getAccessToken(): string | null {
    return this.token();
  }

  getRefreshToken(): string | null {
    return this.refreshToken();
  }

  logout() {

    localStorage.clear();

    this.token.set(null);
    this.refreshToken.set(null);

    this.router.navigate(['']);
  }
}
