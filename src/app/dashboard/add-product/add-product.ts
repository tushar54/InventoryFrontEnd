import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,CommonModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct {
  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  uploading: boolean = false;

  private baseUrl = 'https://inventorybackend-9b01.onrender.com/api/products';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: ['', Validators.required], 
    });
  }

  // Handle image selection and upload
  async onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // Preview locally
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result);
    reader.readAsDataURL(file);

    // Upload to Imgbb
    this.uploading = true;
    try {
      const base64 = await this.getBase64(file);
      const apiKey = '14e899ced155f22b401f32f8f5525fea'; 

      const formData = new FormData();
      formData.append('image', base64);

      const res: any = await this.http
        .post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData)
        .toPromise();

      this.productForm.patchValue({ image: res.data.url }); 
      console.log('Image uploaded:', res.data.url);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image!');
    } finally {
      this.uploading = false;
    }
  }

  // Convert File to Base64
  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }


  onSubmit() {
    if (this.productForm.invalid) {
      alert('Please fill all fields properly!');
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      alert('❌ You must be logged in to add a product!');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(this.baseUrl, this.productForm.value, { headers }).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.productForm.reset();
        this.imagePreview = null;
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to add product!');
      }
    });
  }
}
