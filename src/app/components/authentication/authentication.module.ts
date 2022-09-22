import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { SharedModule } from 'app/shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
/*import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SessionsRoutes } from "./authentication.routing";
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { Signup2Component } from './signup2/signup2.component';
import { Signup3Component } from './signup3/signup3.component';
import { Signup4Component } from './signup4/signup4.component';
import { Signin3Component } from './signin3/signin3.component';
import { Signin4Component } from './signin4/signin4.component';*/
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { AuthenticationRoutes } from "./authentication.routing";
import { BlockCopyPasteDirective } from 'app/shared/directives/block-copy-paste.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  declarations: [LoginComponent, ChangePasswordComponent, BlockCopyPasteDirective]
})
export class AuthenticationModule { }