import { Routes } from '@angular/router';

import { FinancingComponent } from './financing.component';


export const FinancingRoutes: Routes = [
  { path: '', component: FinancingComponent, data: { title: 'Financiacion' } }
];