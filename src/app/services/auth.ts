import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[] = [];
  private loggedInUser: any = null;

  constructor() {
    // Load users from localStorage when app starts
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  // ✅ Register new user
  register(data: { name: string; email: string; password: string }) {
    const existingUser = this.users.find(u => u.email === data.email);

    if (existingUser) {
      throw new Error('User already exists!');
    }

    this.users.push(data);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // ✅ Login existing user
 login(email: string, password: string): boolean {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u: any) => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return true;
  }
  return false;
}


  // ✅ Get current logged-in user
  getUser() {
    if (!this.loggedInUser) {
      const stored = localStorage.getItem('loggedInUser');
      this.loggedInUser = stored ? JSON.parse(stored) : null;
    }
    return this.loggedInUser;
  }

  // ✅ Logout
  logout() {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
  }

  // ✅ Get all users (for admin or debugging)
  getAllUsers() {
    return this.users;
  }
}
