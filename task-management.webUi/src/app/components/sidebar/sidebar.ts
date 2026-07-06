import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../../core/services/layout-service';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {


  layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  username = this.authService.getUserName();
  role = this.authService.getUserRole();
  private router = inject(Router);

  logout() {
    this.authService.logout();
  }

  onProfileClick() {
    this.router.navigate(['/profile-settings']);
  }

}
