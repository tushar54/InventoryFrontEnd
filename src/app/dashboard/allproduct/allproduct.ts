import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allproduct.html',
  styleUrls: ['./allproduct.css'],
})
export class Allproduct implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];
  editingIndex: number | null = null;

  searchTerm: string = '';
  selectedCategory: string = 'all';
  sortBy: string = 'name';

  currentPage: number = 1;
  itemsPerPage: number = 6;

  categories: string[] = [];

  private baseUrl = 'https://inventorybackend-9b01.onrender.com/api/products';

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  // ✅ Load products from backend
  loadProducts() {
    const token = this.authService.getToken();
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(this.baseUrl, { headers }).subscribe({
      next: (res) => {
        this.products = res;
        this.filteredProducts = [...this.products];
        console.log('Products loaded:', this.products);
        // Extract unique categories
        this.categories = Array.from(new Set(this.products.map(p => p.category)));
        this.applyFilters();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load products!');
      }
    });
  }

  // ---------------- Filters & Sorting ----------------
  applyFilters() {
    let temp = [...this.products];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      temp = temp.filter(
        p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategory !== 'all') {
      temp = temp.filter(p => p.category === this.selectedCategory);
    }

    // Sort
    temp.sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'price') return a.price - b.price;
      if (this.sortBy === 'quantity') return a.quantity - b.quantity;
      return 0;
    });

    this.filteredProducts = temp;
    this.currentPage = 1;
    this.updatePagination();
  }

  // ---------------- Pagination ----------------
  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage = page;
    this.updatePagination();
  }

  totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  // ---------------- Delete ----------------
  deleteProduct(index: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const deleted = this.paginatedProducts[index];
    const token = this.authService.getToken();
    if (!token) return;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${this.baseUrl}/${deleted.id}`, { headers }).subscribe({
      next: () => {
        alert('✅ Product deleted successfully!');
        this.loadProducts(); // reload from backend
      },
      error: (err) => console.error(err)
    });
  }

  // ---------------- Edit ----------------
  startEdit(index: number) {
    this.editingIndex = (this.currentPage - 1) * this.itemsPerPage + index;
  }

  saveEdit(index: number) {
    const updatedProduct = this.filteredProducts[(this.currentPage - 1) * this.itemsPerPage + index];
    const token = this.authService.getToken();
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`${this.baseUrl}/${updatedProduct.id}`, updatedProduct, { headers }).subscribe({
      next: () => {
        alert('✅ Product updated successfully!');
        this.editingIndex = null;
        this.loadProducts();
      },
      error: (err) => console.error(err)
    });
  }

  cancelEdit() {
    this.editingIndex = null;
    this.applyFilters();
  }

  // ---------------- Export CSV ----------------
  exportToCSV() {
    if (!this.products.length) return alert('No products to export!');
    const headers = ['Name', 'Description', 'Category', 'Quantity', 'Price', 'User Email'];
    const rows = this.filteredProducts.map(p => [
      p.name, p.description, p.category, p.quantity, p.price, p.user_email || ''
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\r\n';
    rows.forEach(row => csvContent += row.join(',') + '\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
