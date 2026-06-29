import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthStore {
    accessToken = signal<string | null>(localStorage.getItem('token'));
    refreshToken = signal<string | null>(localStorage.getItem('refresh-token'));
    isLoggedIn = computed(() => !!this.accessToken());

    setTokens(accessToken: string, refreshToken: string) {

        this.accessToken.set(accessToken);
        this.refreshToken.set(refreshToken);

        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh-token', refreshToken);
    }

    clear() {

        this.accessToken.set(null);
        this.refreshToken.set(null);

        localStorage.clear();
    }

}