import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/request/login-request';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
  getUserName(): string | null {
    const token = this.getAccessToken();

    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      return (decoded.first_name + " " + decoded.last_name).trim() ?? null;
    } catch {
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();

    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      return this.formatRoleText(decoded.user_access_type);
    } catch {
      return null;
    }
  }

  private formatRoleText(value: string): string {
    if (!value) {
      return '';
    }

    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
