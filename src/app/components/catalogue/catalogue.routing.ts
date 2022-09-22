import { Routes } from '@angular/router';

import { CatalogueComponent } from './catalogue.component';


export const CompanyRoutes: Routes = [
  { path: '', component: CatalogueComponent, data: { title: 'Cátalogo' } }
];