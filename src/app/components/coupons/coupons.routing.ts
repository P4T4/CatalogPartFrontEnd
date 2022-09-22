import { Routes } from '@angular/router';

import { CouponsComponent } from './coupons.component';


export const CouponsRoutes: Routes = [
  { path: '', component: CouponsComponent, data: { title: 'Cupones' } }
];