import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyComponent } from './company.component';
import { CompanyRoutes } from './company.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forChild(CompanyRoutes)
  ],
  declarations: [CompanyComponent]
})
export class CompanyModule { }
