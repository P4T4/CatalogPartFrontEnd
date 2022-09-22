import { Routes } from '@angular/router';

import { ModelMarkComponent } from './modelMark.component';


export const ModelMarkRoutes: Routes = [
  { path: '', component: ModelMarkComponent, data: { title: 'Modelos por Marca' } }
];