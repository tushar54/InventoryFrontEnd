import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // ✅ Check if a JWT token exists
    const token = this.auth.getToken();
    if (!token) {
      // If no token, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    // Optionally, you can also decode/verify the token here using jwt-decode
    // to check expiration or user info if needed

    return true;
  }
}
