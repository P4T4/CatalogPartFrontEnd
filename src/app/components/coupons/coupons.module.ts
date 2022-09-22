import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
/* módulo central angular-google-maps */
import { AgmCoreModule } from '@agm/core';

import { CouponsComponent } from './coupons.component';
import { CouponsRoutes } from './coupons.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0' }),
    RouterModule.forChild(CouponsRoutes)
  ],
  declarations: [CouponsComponent]
})
export class CouponsModule { }
