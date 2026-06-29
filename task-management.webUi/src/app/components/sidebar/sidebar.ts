import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../../core/services/layout-service';
import { AuthService } from '../../core/services/auth-service';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  layoutService = inject(LayoutService);
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }

}