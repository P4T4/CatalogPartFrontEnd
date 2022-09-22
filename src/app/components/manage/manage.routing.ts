import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { EnterprisesComponent } from './enterprises/enterprises.component';

export const ManageRoutes: Routes = [
  { 
    path: 'users', 
    component: UsersComponent, 
    data: { title: 'Usuarios', breadcrumb: 'Usuarios' } 
  },
  { 
    path: 'users/:id', 
    component: UsersComponent, 
    data: { title: 'Usuarios', breadcrumb: 'Usuarios' } 
  },
  { 
    path: 'enterprises', 
    component: EnterprisesComponent, 
    data: { title: 'Empresas', breadcrumb: 'Empresas' } 
  }
];