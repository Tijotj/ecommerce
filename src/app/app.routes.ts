import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SaleComponent } from './sale/sale.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'products',
        component: HomeComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'sale',
        component: SaleComponent
    }
];
