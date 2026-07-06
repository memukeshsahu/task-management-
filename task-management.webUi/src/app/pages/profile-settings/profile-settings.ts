import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../core/services/auth-service';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';




@Component({
  selector: 'app-profile-settings',
  imports: [TabsModule, ButtonModule, InputTextModule, ReactiveFormsModule, PasswordModule],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css',
})
export class ProfileSettings {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  profileForm: FormGroup<any> | any;

  changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required,
    Validators.minLength(8)],
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)],
    confirmPassword: ['', [Validators.required]]
  }, { validators: passwordMatchValidator });

  ngOnInit() {
    this.loadProfileData();

  }
  loadProfileData() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      role: [{ value: '', disabled: true }, [Validators.required]]
    });
    const userData = this.authService.getUserData();
    if (userData) {
      this.profileForm.patchValue({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role
      });
    }
  }
  updateProfile() {
    console.log('Profile Updated:', this.profileForm.value);
  }

  onChangePassword() {
    console.log('Password Change Requested:', this.changePasswordForm.value);
  }
}

