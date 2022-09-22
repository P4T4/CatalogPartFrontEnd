import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnterpriseView } from 'app/models/enterprises';
import { IdentityUserView, InfoUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { EnterpriseService } from 'app/services/enterprise.service';
import { ErrorService } from 'app/services/error.service';
import { InfoUserService } from 'app/services/info-user.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myAccount: FormGroup;
  currentUser: IdentityUserView;
  currentUserInfo: InfoUserView;
  listEnterprises: EnterpriseView[] = [];
  listTypeUSer: any[] = [
    { label: 'Admin', value: 1 },
    { label: 'ClientPerson', value: 2 },
    { label: 'ClientAdminEnterprise', value: 3 },
    { label: 'ClientUserEnterprise', value: 4 }
  ]

  constructor(
    private _errorService: ErrorService,
    private _loader: AppLoaderService,
    private _infoUserService: InfoUserService,
    private _configService: ConfigurationService,
    private _enterpriseService: EnterpriseService
  ) {
  }

  public get name() { return this.myAccount.get('name') }
  // public get email() { return this.myAccount.get('email') }
  public get email() { return this.currentUser.email }
  public get identificationNumber() { return this.myAccount.get('identificationNumber') }
  public get city() { return this.myAccount.get('city') }
  public get address() { return this.myAccount.get('address') }
  public get phone() { return this.myAccount.get('phone') }

  ngOnInit() {
    this.currentUser = this._configService.GetCurrentUser()
    console.log(this.currentUser)
    this._infoUserService.InfoUserByIdentityUser().subscribe((infoUser: InfoUserView) => {
      this.currentUserInfo = infoUser
      this.setForm(this.currentUserInfo)
    })
    this.setForm()
  }

  setForm(dataUser: any = null) {
    this.myAccount = new FormGroup({
      name: new FormControl(this.currentUser.name, Validators.required),
      // email: new FormControl(this.currentUser.email, Validators.required),
      identificationNumber: new FormControl(dataUser?.identificationNumber, Validators.required),
      city: new FormControl(dataUser?.city, Validators.required),
      address: new FormControl(dataUser?.address, Validators.required),
      phone: new FormControl(dataUser?.phone, Validators.required),
    })
  }

  onSubmit() {
    let form = this.myAccount.value
    let objectToSend: InfoUserView = {
      address: form?.address,
      city: form?.city,
      phone: form?.phone,
      identificationNumber: form?.identificationNumber,
      identityUserId: this.currentUserInfo.identityUserId,
      contactPerson: this.currentUserInfo.contactPerson,
      contactSellerLink: this.currentUserInfo.contactSellerLink,
      enterpriseId: this.currentUserInfo.enterpriseId,
      infoUserId: this.currentUserInfo.infoUserId
    }
    // console.log(objectToSend)
    this._loader.open()
    this._infoUserService.CreateOrUpdateInfoUser(objectToSend).subscribe((result) => {
      this._loader.close()
      this._errorService.SwalAlert('Proceso exitoso', 'Usuario actualizado', 'success')
    }, error => {
      this._loader.close()
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }

}
