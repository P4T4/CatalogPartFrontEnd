import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
/* módulo central angular-google-maps */
import { AgmCoreModule } from '@agm/core';

import { ContactComponent } from './contact.component';
import { ContactRoutes } from './contact.routing';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBNcjxo_35qnEG17dQvvftWa68eZWepYE0' }),
    RouterModule.forChild(ContactRoutes)
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
