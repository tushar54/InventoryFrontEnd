import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  agreed = false;
  showPassword = false;
  showConfirm = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // ✅ Register via backend
  register() {
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.agreed) {
      this.errorMessage = 'You must agree to the Terms & Conditions.';
      return;
    }

    // Call backend register API
    this.authService.register({ name:this.name,email: this.email, password: this.password }).subscribe({
      next: (res) => {
        alert('🎉 Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Registration failed!';
      }
    });

  }
}
