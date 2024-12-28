import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SaleComponent } from './sale/sale.component';
import { ProductService } from './services/product.service';
//import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HomeComponent,CartComponent,SaleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app';
  cartItems: any[] = [];
  subTotal: number = 0;
  constructor(private pdtServ: ProductService, private router: Router){
    this.pdtServ.cartAddedSubject.subscribe({
      next:(v) => {
        this.loadCart();
      }
    });
  }
  ngOnInit(): void{
    this.loadCart();
  }
  loadCart(){
    this.pdtServ.getCartItemsByCustomerId(1).subscribe({
      next:(v) => {
        this.cartItems = v.data;
        this.subTotal = 0;
        this.cartItems.forEach((item)=> {
          this.subTotal += item.productPrice;
        });
      }
    });
  }
  navigateToSale(){
    this.router.navigateByUrl('sale');
  }
}
