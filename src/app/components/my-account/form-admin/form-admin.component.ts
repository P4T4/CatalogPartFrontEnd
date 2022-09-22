import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnterpriseView, IEnterpriseEditInfo } from 'app/models/enterprises';
import { IdentityUserView, InfoUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { EnterpriseService } from 'app/services/enterprise.service';
import { ErrorService } from 'app/services/error.service';
import { InfoUserService } from 'app/services/info-user.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent implements OnInit {
  myBussinessAccount: FormGroup;
  currentUser: IdentityUserView;
  currentUserInfo: InfoUserView;
  currentCompany: EnterpriseView;
  listEnterprises: EnterpriseView[] = [];
  listTypeUSer: any[] = [
    { label: 'Admin', value: 1 },
    { label: 'ClientPerson', value: 2 },
    { label: 'ClientAdminEnterprise', value: 3 },
    { label: 'ClientUserEnterprise', value: 4 }
  ]

  constructor(
    private _errorService: ErrorService,
    private _enterpriseService: EnterpriseService,
    private _infoUserService: InfoUserService,
    private _loader: AppLoaderService,
    private _configService: ConfigurationService
  ) {
  }

  public get name() { return this.myBussinessAccount.get('name') }
  public get email() { return this.myBussinessAccount.get('email') }
  public get isActive() { return this.myBussinessAccount.get('isActive') }
  public get city() { return this.myBussinessAccount.get('city') }
  public get address() { return this.myBussinessAccount.get('address') }
  public get phone() { return this.myBussinessAccount.get('phone') }
  public get identificationNumber() { return this.myBussinessAccount.get('identificationNumber') }
  public get identificationNumberCompany() { return this.currentCompany?.identificationNumber }
  public get businessName() { return this.myBussinessAccount.get('businessName') }
  public get businessCity() { return this.myBussinessAccount.get('businessCity') }
  public get businessAdress() { return this.myBussinessAccount.get('businessAdress') }
  public get businessPhone() { return this.myBussinessAccount.get('businessPhone') }

  ngOnInit() {
    this._enterpriseService.EnterpriseAll()
      .subscribe((result: EnterpriseView[]) => {
        this.listEnterprises = result
      }, error => {
        var message = this._errorService.HadlingError(error);
        this._errorService.SwalAlert(message.message, '', message.type);
      })
    this.currentUser = this._configService.GetCurrentUser()
    this._infoUserService.InfoUserByIdentityUser().subscribe((infoUser: InfoUserView) => {
      this.currentUserInfo = infoUser
      this._enterpriseService.EnterpriseById().subscribe((company: EnterpriseView) => {
        this.currentCompany = company
        this.setForm(this.currentUserInfo, this.currentCompany)
      })
    })
    this.setForm(this.currentUser)
  }

  setForm(formDataUser: any, formDataCompany: any = null) {
    this.myBussinessAccount = new FormGroup({
      name: new FormControl(this.currentUser?.name, Validators.required),
      email: new FormControl(this.currentUser?.email, Validators.required),
      isActive: new FormControl(formDataCompany?.isRegister, Validators.required),
      city: new FormControl(formDataUser?.city, Validators.required),
      address: new FormControl(formDataUser?.address, Validators.required),
      phone: new FormControl(formDataUser?.phone, Validators.required),
      identificationNumber: new FormControl(formDataUser?.identificationNumber, Validators.required),
      businessName: new FormControl(formDataCompany?.businessName, Validators.required),
      businessCity: new FormControl(formDataCompany?.businessCity, Validators.required),
      businessAdress: new FormControl(formDataCompany?.businessAdress, Validators.required),
      businessPhone: new FormControl(formDataCompany?.businessPhone, Validators.required),
    })
  }

  onSubmit() {
    let objectToSend: IEnterpriseEditInfo = {
      businessAdress: this.businessAdress.value,
      businessCity: this.businessCity.value,
      businessName: this.businessName.value,
      businessPhone: this.businessPhone.value,
      contactPersonName: this.name.value,
      contactSellerLink: '',
      enterpriseId: this.currentUser.enterpriseId,
      identificationNumber: this.identificationNumberCompany,
      identificationNumberUser: this.identificationNumber.value,
      identityUserId: this.currentUser.identityUserId,
      infoUserId: this.currentUserInfo.infoUserId,
      isRegister: this.isActive.value,
      userAdress: this.address.value,
      userCity: this.city.value,
      userPhone: this.phone.value,
    }
    console.log(objectToSend)
    this._loader.open()
    this._enterpriseService.updateEnterprise(objectToSend).subscribe((result) => {
      this._loader.close()
      this._errorService.SwalAlert('Proceso exitoso', 'Usuario actualizado', 'success')
    }, error => {
      this._loader.close()
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }
}
