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

  constructor() {
    console.log('[AuthService] Initialized');
    console.log('[AuthService] Access Token:', this.token());
    console.log('[AuthService] Refresh Token:', this.refreshToken());
  }

  isLoggedIn = computed(() => {
    const loggedIn = !!this.token();
    console.log('[AuthService] isLoggedIn:', loggedIn);
    return loggedIn;
  });

  login(request: LoginRequest) {
    console.log('[AuthService] Login Request:', request);

    return this.http.post<any>(
      `${this.apiUrl}auth/login`,
      request
    );
  }

  refreshAccessToken() {
    console.log('[AuthService] Refreshing Access Token');
    console.log('[AuthService] Refresh Token:', this.refreshToken());

    return this.http.post<any>(
      `${this.apiUrl}auth/refresh-token`,
      {
        refreshToken: this.refreshToken()
      }
    );
  }

  saveTokens(accessToken: string, refreshToken: string) {
    console.log('[AuthService] Saving Tokens');
    console.log('[AuthService] Access Token:', accessToken);
    console.log('[AuthService] Refresh Token:', refreshToken);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh-token', refreshToken);

    this.token.set(accessToken);
    this.refreshToken.set(refreshToken);

    console.log('[AuthService] Tokens Saved Successfully');
  }

  getAccessToken(): string | null {
    console.log('[AuthService] getAccessToken:', this.token());
    return this.token();
  }

  getRefreshToken(): string | null {
    console.log('[AuthService] getRefreshToken:', this.refreshToken());
    return this.refreshToken();
  }

  logout() {
    console.log('[AuthService] Logging out');

    localStorage.clear();

    this.token.set(null);
    this.refreshToken.set(null);

    console.log('[AuthService] Tokens Cleared');

    this.router.navigate(['']);
  }

  getUserName(): string | null {
    const token = this.getAccessToken();

    if (!token) {
      console.warn('[AuthService] No Access Token Found');
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      console.log('[AuthService] Decoded Token:', decoded);

      const userName = `${decoded.first_name} ${decoded.last_name}`.trim();

      console.log('[AuthService] User Name:', userName);

      return userName;
    } catch (error) {
      console.error('[AuthService] Failed to Decode Token', error);
      return null;
    }

  }

  getUserData(): any | null {
    const token = this.getAccessToken();

    if (!token) {
      console.warn('[AuthService] No Access Token Found');
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      console.log('[AuthService] Decoded Token:', decoded);
      const userData = {
        firstName: decoded.first_name,
        lastName: decoded.last_name,
        email: 'test@example.com',
        role: decoded.user_access_type
      };

      console.log('[AuthService] User Data:', userData);

      return userData;
    } catch (error) {
      console.error('[AuthService] Failed to Decode Token', error);
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();

    if (!token) {
      console.warn('[AuthService] No Access Token Found');
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);

      console.log('[AuthService] Decoded Token:', decoded);

      const role = this.formatRoleText(decoded.user_access_type);

      console.log('[AuthService] User Role:', role);

      return role;
    } catch (error) {
      console.error('[AuthService] Failed to Decode Token', error);
      return null;
    }
  }

  private formatRoleText(value: string): string {
    console.log('[AuthService] Formatting Role:', value);

    if (!value) {
      return '';
    }

    const formatted = value.replace(/([a-z])([A-Z])/g, '$1 $2');

    console.log('[AuthService] Formatted Role:', formatted);

    return formatted;
  }
}
