import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductCartByCatalogueComponent } from './productCartByCatalogue.component';
import { ProductCartByCatalogueRoutes } from './productCartByCatalogue.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule.forChild(ProductCartByCatalogueRoutes)
  ],
  declarations: [ProductCartByCatalogueComponent]
})
export class ProductCartByCatalogueModule { }
