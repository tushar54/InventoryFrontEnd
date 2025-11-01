import { Component } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth'; // ✅ import AuthService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Navbar, RouterOutlet,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
