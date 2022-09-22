import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FinancingComponent } from './financing.component';
import { FinancingRoutes } from './financing.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(FinancingRoutes)
  ],
  declarations: [FinancingComponent]
})
export class FinancingModule { }
