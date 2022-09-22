import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IChangePassUser, IdentityUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { ErrorService } from 'app/services/error.service';
import { LoginService } from 'app/services/login.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?¿&\/()=\.\+\-])([A-Za-z\d$@$!%*?&\/\.\+\-]|[^ ]){8,15}$/;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public hide_current: boolean = true
  public hide_new: boolean = true
  public hide_confirm: boolean = true

  changePasswordForm: FormGroup;
  currentUser: IdentityUserView;

  constructor(
    private _errorService: ErrorService,
    private _loginService: LoginService,
    private _loader: AppLoaderService,
    private router: Router,
    private _configService: ConfigurationService
  ) {
  }

  public get currentPassword() { return this.changePasswordForm.get('currentPassword') }
  public get newPassword() { return this.changePasswordForm.get('newPassword') }
  public get confirmNewPassword() { return this.changePasswordForm.get('confirmNewPassword') }

  ngOnInit() {
    this.currentUser = this._configService.GetCurrentUser()
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl(null, [
        Validators.required,
      ]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(regex)
      ]),
      confirmNewPassword: new FormControl(null, [
        Validators.required
      ]),
    })
  }

  checkPasswords(newPass, confirmPass) {
    return newPass !== confirmPass
  }

  onSubmit() {
    if (this.checkPasswords(this.newPassword.value, this.confirmNewPassword.value)) {
      this._errorService.SwalAlert('Error en el formulario', 'Las contraseñas no coinciden', 'error')
      return;
    }
    let objectToSend: IChangePassUser = {
      identityUserId: this.currentUser.identityUserId,
      email: this.currentUser.email,
      currentPass: this.currentPassword.value,
      newPass: this.newPassword.value,
      confirmNewPass: this.confirmNewPassword.value
    }
    this._loader.open()
    this._loginService.ChangePassword(objectToSend).subscribe((result) => {
      this._loader.close()
      this._errorService.SwalAlert('Mensaje del sistema', 'El cambio de contraseña fue exitoso, inicie sesión nuevamente', 'success').then(() => {
        this._loginService.Logout();
        this.router.navigate(['/auth/login']);
      })
      console.log(result)
    }, error => {
      this._loader.close()
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }
}
