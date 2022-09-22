import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductModelComponent } from './productModel.component';
import { ProductModelRoutes } from './productModel.routing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule, 
    MatIconModule,   
    RouterModule.forChild(ProductModelRoutes)
  ],
  declarations: [ProductModelComponent]
})
export class ProductModel { }
