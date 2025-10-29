import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // ✅ Prevent form reload and handle login
  login(event: Event) {
    event.preventDefault(); // Prevents page reload

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both email and password.';
      return;
    }

    const success = this.authService.login(this.email, this.password);

    if (success) {
      alert('✅ Login successful!');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
