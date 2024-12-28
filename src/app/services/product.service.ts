import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public cartAddedSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any> {
    debugger;
    return this.http.get<any>('https://onlinetestapi.gerasim.in/api/Ecomm/GetAllProducts');
  }
  addToCart(obj: any):Observable<any>{
    return this.http.post<any>('https://onlinetestapi.gerasim.in/api/Ecomm/AddToCart',obj);
  }
  getCartItemsByCustomerId(custId: number):Observable<any>{
   return this.http.get<any>('https://onlinetestapi.gerasim.in/api/Ecomm/GetCartProductsByCustomerId?id='+custId);
  }
  removeCartItemById(cartId: number):Observable<any>{
    return this.http.get<any>('https://onlinetestapi.gerasim.in/api/Ecomm/DeleteProductFromCartById?id='+cartId);
  }
  makeSaleItems(saleObj:any):Observable<any>{
    return this.http.post('https://onlinetestapi.gerasim.in/api/Ecomm/AddNewSale',saleObj);
  }
}
