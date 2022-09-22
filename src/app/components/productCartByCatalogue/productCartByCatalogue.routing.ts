import { Routes } from '@angular/router';

import { ProductCartByCatalogueComponent } from './productCartByCatalogue.component';


export const ProductCartByCatalogueRoutes: Routes = [
  { path: '', component: ProductCartByCatalogueComponent, data: { title: 'Despliegue de productos' } }
];