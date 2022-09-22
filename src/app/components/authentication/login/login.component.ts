import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { LoginRequestView, IdentityUserView } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ErrorService } from '../../../services/error.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: egretAnimations
})
export class LoginComponent implements OnInit {
  hide_pass: boolean = true
  userLogin: LoginRequestView = { email: null, password: null };
  email: string;
  password: string;

  loginRequestView: LoginRequestView;
  currentUser: IdentityUserView;


  constructor(private _loginService: LoginService,
    private router: Router,
    private loader: AppLoaderService,
    private _errorService: ErrorService) {

  }

  ngOnInit() {
    localStorage.removeItem('reload');
  }

  login(formu: NgForm) {
    /* this.alert = false; */
    this.loader.open();
    this.email = formu.controls['email'].value;
    this.password = formu.controls['password'].value;
    this.loginRequestView = { email: this.email, password: this.password };
    console.log('la data a enviar al servicio es: ', this.loginRequestView);
    this._loginService.Login(this.loginRequestView)
      .subscribe((responsev: IdentityUserView) => {
        this.currentUser = responsev;
        console.log('Respuesta del servicio Login: ', this.currentUser);
      },
        error => {
          console.log('Error login', error);
          if (error.status == '404') {
            console.error('Error ->', error.error.message);
          } else {
            console.error('Error del servidor');
          }
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
          this.loader.close();
        },
        () => {
          this.loader.close();
          if (this.currentUser.token) {
            console.log('si tiene token'), this.currentUser;
            this.router.navigate(['/inicio/true'])
          } else {
            console.log('no posee un token');
          }

        });
  }
}
