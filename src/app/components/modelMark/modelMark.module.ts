import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModelMarkComponent } from './modelMark.component';
import { ModelMarkRoutes } from './modelMark.routing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    SweetAlert2Module,
    MatIconModule,
    RouterModule.forChild(ModelMarkRoutes)
  ],
  declarations: [ModelMarkComponent]
})
export class ModelMarkModule { }
