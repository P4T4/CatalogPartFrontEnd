import { Routes } from '@angular/router';

import { ProductCartComponent } from './productCart.component';


export const ProductCartRoutes: Routes = [
  { path: '', component: ProductCartComponent, data: { title: 'Despliegue de productos' } }
];