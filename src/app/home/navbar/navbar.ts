import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  theme: 'light' | 'dark' = 'light';
  isLoggedIn = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.theme = savedTheme;
      document.documentElement.setAttribute('data-theme', this.theme);
    }

    // Initial login status
    this.checkLoginStatus();
  }

  // ✅ Toggle light/dark theme
  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  // ✅ Check if user logged in (using JWT)
  checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      // optional: display email from saved token
      const email = localStorage.getItem('user_email');
      this.userName = email ? email : 'User';
    } else {
      this.userName = '';
    }
  }

  // ✅ Logout user
  logout(): void {
  const confirmLogout = confirm('Are you sure you want to log out?');
  if (confirmLogout) {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    alert('You have been logged out.');
    this.router.navigate(['/login']);
  }
}
}
