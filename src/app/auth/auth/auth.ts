import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Save a fake user in localStorage
  register(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      alert('User already exists!');
      return false;
    }

    // Save new user
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now login.');
    return true;
  }

  // Login and save session
  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', email);
      this.router.navigate(['/dashboard']);
      return true;
    } else {
      alert('Invalid credentials');
      return false;
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }
}
