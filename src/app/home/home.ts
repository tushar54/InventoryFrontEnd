import { Component } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { AllProduct } from "./all-product/all-product";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-home',
  imports: [Navbar, AllProduct, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
