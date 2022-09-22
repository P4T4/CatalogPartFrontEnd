import { Routes } from '@angular/router';

import { ProductModelComponent } from './productModel.component';


export const ProductModelRoutes: Routes = [
  { path: '', component: ProductModelComponent, data: { title: 'Productos por Modelo del vehículo.' } }
];