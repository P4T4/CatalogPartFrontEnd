import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, NgForm, NgModel } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { IdentityUserView } from '../../../models/user';
import { EnterpriseView } from '../../../models/business';
import { IdentityUserService } from '../../../services/identity-user.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ErrorService } from '../../../services/error.service';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';
import { Guid } from 'guid-typescript';
import { MatDialog } from '@angular/material/dialog';
import { TycModalComponent } from './tyc-modal/tyc-modal.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: egretAnimations
})
export class RegisterComponent implements OnInit {
  @ViewChild(NgModel, { static: true }) receiverInput: NgModel;
  openModalTyC: boolean = true;
  entityUser: IdentityUserView = {
    identityUserId: null,
    name: null,
    email: null,
    password: null,
    typeUser: null,
    isActive: null,
    isTempPassword: null,
    token: null,
    contactSellerLink: null
  };
  name: string;
  email: string;
  check: boolean;
  loginRequestView: IdentityUserView;

  //Empresas
  entityEnterprise: EnterpriseView = {
    enterpriseId: null,
    identificationNumber: null,
    businessName: null,
    businessCity: null,
    businessAdress: null,
    businessPhone: null,
    contactPersonName: null,
    contactPersonEmail: null
  };
  mumberIdentification: string;
  nameBusiness: string;
  cityBusiness: string;
  adressBusiness: string;
  phoneBusiness: string;
  terminos: boolean;
  mailContactPerson: string;
  nameContactPerson: string;

  businessView: EnterpriseView;
  currentUser: IdentityUserView;

  constructor(
    private _identityUserService: IdentityUserService,
    private _enterpriseService: EnterpriseService,
    private router: Router,
    private loader: AppLoaderService,
    private _errorService: ErrorService,
    public dialog: MatDialog
  ) {
    //this.check = false;
  }

  ngOnInit() { }

  openDialog(event: any): void {
    event?.preventDefault();
    this.openModalTyC = false;
    const dialogRef = this.dialog.open(TycModalComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  // Persona Natural
  createUser(formu: NgForm) {
    this.loader.open();
    this.name = formu.controls['name'].value;
    this.email = formu.controls['email'].value;
    this.loginRequestView = {
      identityUserId: null,
      name: this.name,
      email: this.email,
      password: '',
      typeUser: 2,
      isActive: true,
      isTempPassword: true,
      token: null,
      contactSellerLink: null
    };
    this._identityUserService.CreateUser(this.loginRequestView)
      .subscribe((responsev: IdentityUserView) => {
        this._identityUserService.sendMail(this.loginRequestView.name, this.loginRequestView.email).subscribe(() => {
          Swal.fire('Información enviada correctamente.', 'Nos comunicaremos contigo mediante el correo electrónico suministrado para continuar con el proceso.', 'success');
          this.loader.close();
          this.router.navigate(['/auth/login'])
        }, error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
          this.loader.close();
        })
      }, error => {
        console.log('Error registro usuario', error);
        if (error.status == '404') {
          console.error('Error ->', error.error.message);
        } else {
          console.error('Error del servidor');
        }
        var message = this._errorService.HadlingError(error);
        this._errorService.SwalAlert(message.message, '', message.type);
        this.loader.close();
      });
  }

  // EMPRESAS
  createBusiness(forma: NgForm) {
    this.loader.open();
    this.mumberIdentification = forma.controls['mumberIdentification'].value;
    this.nameBusiness = forma.controls['nameBusiness'].value;
    this.cityBusiness = forma.controls['cityBusiness'].value;
    this.adressBusiness = forma.controls['adressBusiness'].value;
    this.phoneBusiness = forma.controls['phoneBusiness'].value;
    this.nameContactPerson = forma.controls['nameContactPerson'].value;
    this.mailContactPerson = forma.controls['mailContactPerson'].value;

    this.businessView = {
      enterpriseId: null,
      identificationNumber: this.mumberIdentification,
      businessName: this.nameBusiness,
      businessCity: this.cityBusiness,
      businessAdress: this.adressBusiness,
      businessPhone: this.phoneBusiness,
      contactPersonEmail: this.mailContactPerson,
      contactPersonName: this.nameContactPerson
    };
    console.log(this.businessView)
    this._enterpriseService.CreateEnterprise(this.businessView)
      .subscribe((responsev: EnterpriseView) => {
        this._enterpriseService.sendMail(this.businessView.businessName).subscribe(() => {
          Swal.fire('Información enviada correctamente.', 'Se realizará la validación de la información y nos comunicaremos contigo.', 'success');
          this.loader.close();
          this.router.navigate(['/auth/login'])
        }, error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
          this.loader.close();
        })
      }, error => {
        console.log('Error registro empresa', error);
        if (error.status == '404') {
          console.error('Error ->', error?.error?.message ?? error.message);
        } else {
          console.error('Error del servidor');
        }
        var message = this._errorService.HadlingError(error);
        this._errorService.SwalAlert(message.message, '', message.type);
        this.loader.close();
      });
  }

  handleMatTabChange(event: MatTabChangeEvent) {
    this.openModalTyC = true;
    this.check = false;
  }
}