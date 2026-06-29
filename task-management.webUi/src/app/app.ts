import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { AuthService } from './core/services/auth-service';
import { LayoutService } from './core/services/layout-service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('task-management');

  authService = inject(AuthService);

  layoutService = inject(LayoutService);

  router = inject(Router);
  ngOnInit() {

  }


}