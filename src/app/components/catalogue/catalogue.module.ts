import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CatalogueComponent } from './catalogue.component';
import { CompanyRoutes } from './catalogue.routing';
import { SafePipe } from 'app/pipes/SafePipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule.forChild(CompanyRoutes)
  ],
  declarations: [CatalogueComponent, SafePipe ]
})
export class CatalogueModule { }
