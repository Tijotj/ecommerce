import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productList: any[] = [];
  cartObj: any = {
    CartId: 0,
    CustId: 1,
    ProductId: 0,
    Quantity: 0,
    AddedDate: "2024-12-27T08:25:40.111Z"
  };
  constructor(private pdtServ: ProductService){}
  ngOnInit():void{
    this.loadAllProducts();
  }
  loadAllProducts(){
    this.pdtServ.getAllProducts().subscribe({
      next:(v:any) => {
        this.productList = v.data;
      }
    });
  }
  addItemToCart(productId: number){
    this.cartObj.ProductId = productId;
    this.pdtServ.addToCart(this.cartObj).subscribe({
      next:(v) => {
        if(v.result){
          alert("Item added to cart!");
          this.pdtServ.cartAddedSubject.next(true);
        }
      }
    });
  }
}
