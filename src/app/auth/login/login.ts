import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  email = '';
  password = '';
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(event: Event) {
    event.preventDefault(); // prevent page reload
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in both email and password.';
      return;
    }

    // Call backend login API
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        // Save JWT token in localStorage
        this.authService.saveToken(res.token);

        alert('✅ Login successful!');
        this.router.navigate(['/dashboard']); // redirect after login
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.error || 'Invalid email or password.';
      },
    });
  }
}
