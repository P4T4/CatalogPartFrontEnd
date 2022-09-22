import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { IChangePassUser, IdentityUserView } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ErrorService } from '../../../services/error.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { IdentityUserService } from 'app/services/identity-user.service';
import Swal from 'sweetalert2';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&\.\+\-])([A-Za-z\d$@$!%*?&\.\+\-]|[^ ]){8,15}$/;

@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss'],
  animations: egretAnimations
})
export class ChangePasswordComponent implements OnInit {
  hide_newPass: boolean = true
  hide_confirmPass: boolean = true
  userLogin: any = { confirmPassword: null, password: null };
  changePasswordRequest: IdentityUserView;
  currentUser: IdentityUserView;

  PasswordGroup: FormGroup;

  constructor(
    private _loginService: LoginService,
    private router: Router,
    private _route: ActivatedRoute,
    private _identityUserService: IdentityUserService,
    private loader: AppLoaderService,
    private _errorService: ErrorService
  ) {
  }

  public get newPassword() { return this.PasswordGroup.get('newPassword'); }
  public get confirmPassword() { return this.PasswordGroup.get('confirmPassword'); }

  ngOnInit() {
    this.PasswordGroup = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(regex)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ])
    })
    this._route.params
      .subscribe(params => {
        this.loader.open()
        this._identityUserService.isFirtsChangePassword(params.id).subscribe((result) => {
          this.loader.close()
          if (!result) {
            Swal.fire('Error de ingreso', 'El usuario ya tiene una contraseña', 'error').then((result) => {
              console.log(result)
              this.router.navigate(['/'])
            })
          }
        }, error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message?.message, '', message?.type);
          this.router.navigate(['/'])
          this.loader.close();
        })
        console.log(params);
        // falta servicio para traer la informacion del usuario
        this.currentUser = {
          identityUserId: params.id,
          name: '',
          email: '',
          password: '',
          typeUser: 0,
          isActive: true,
          isTempPassword: false,
          token: '',
          contactSellerLink: ''
        }
      });
  }

  checkPasswords(newPass, confirmPass) {
    return newPass !== confirmPass
  }

  //Consumir el servicio para cambiar la contraseña
  changePassword() {
    console.log(this.newPassword.value, this.confirmPassword.value)
    /* this.alert = false; */
    if (this.checkPasswords(this.newPassword.value, this.confirmPassword.value)) {
      this._errorService.SwalAlert('Error en el formulario', 'Las contraseñas no coinciden', 'error')
      return;
    }
    this.loader.open();
    this.changePasswordRequest = {
      ...this.currentUser,
      password: this.newPassword.value,
      isTempPassword: false
    };
    console.log('la data a enviar al servicio es: ', this.changePasswordRequest);
    this._loginService.ChangeInitialPassword(this.changePasswordRequest)
      .subscribe((responsev) => {
        console.log(responsev)
        this._errorService.SwalAlert('Actualización exitosa', 'La contraseña fue actualizada, por favor inicie sesión', 'success')
        // responsev;
      }, error => {
        console.log('Error login', error);
        var message = this._errorService.HadlingError(error);
        this._errorService.SwalAlert(message.message, '', message.type);
        this.loader.close();
      }, () => {
        this.loader.close();
        this.router.navigate(['/auth/login'])
      });
  }

  /*  onSubmit() {
     if (!this.signupForm.invalid) {
       // do what you wnat with your data
       console.log(this.signupForm.value);
     }
   } */

}
