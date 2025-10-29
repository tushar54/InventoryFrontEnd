import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
 theme: 'light' | 'dark' = 'light';

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme',this.theme)
  }
    constructor() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.theme = saved as 'light' | 'dark';
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }

}
