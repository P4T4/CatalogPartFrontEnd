import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WarrantyComponent } from './warranty.component';
import { WarrantyRoutes } from './warranty.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(WarrantyRoutes)
  ],
  declarations: [WarrantyComponent]
})
export class WarrantyModule { }
