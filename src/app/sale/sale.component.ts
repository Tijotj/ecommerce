import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent implements OnInit {
  cartItems: any[] = [];
  subTotal: number = 0;
  saleObj: any = {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "GPay",
    "DeliveryAddress1": "Edens villa",
    "DeliveryAddress2": "kazhakkuttom",
    "DeliveryCity": "Trivandrum",
    "DeliveryPinCode": "695505",
    "DeliveryLandMark": "ATM"
  }

  constructor(private pdtServ: ProductService){
    this.pdtServ.cartAddedSubject.subscribe({
      next:(v)=>{
        this.loadCart();
      }
    });
  }

  ngOnInit():void{
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
  removeItems(id: number){
    this.pdtServ.removeCartItemById(id).subscribe({
      next:(v) => {
        if(v.result){
          this.pdtServ.cartAddedSubject.next(true);
        }
      }
    });
  }
  makeSale(){
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.pdtServ.cartAddedSubject.next(true);
    this.pdtServ.makeSaleItems(this.saleObj).subscribe({
      next:(v)=>{
        if(v.result){
          this.pdtServ.cartAddedSubject.next(true);
          alert("Purchase is successful. Thank you!");
        }
      }
    });
  }
}
