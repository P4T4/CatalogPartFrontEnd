import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register.component';
import { RegisterRoutes } from './register.routing';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TycModalComponent } from './tyc-modal/tyc-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule.forChild(RegisterRoutes)
  ],
  declarations: [RegisterComponent, TycModalComponent]
})
export class RegisterModule { }
