import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from './components/sidebar/sidebar';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-management.webUi');
  private authService = inject(AuthService);
   router=inject(Router);

  get isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }



}
