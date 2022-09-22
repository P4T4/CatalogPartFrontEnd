import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { IdentityUserView, InfoUserView } from 'app/models/user';
import { EnterpriseView } from 'app/models/business';
import { EnterpriseService } from 'app/services/enterprise.service';
import { IEnterpriseEditInfo } from 'app/models/enterprises';
import { IdentityUserService } from 'app/services/identity-user.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { InfoUserService } from 'app/services/info-user.service';

@Component({
  selector: 'app-enterprises-popup',
  templateUrl: './enterprises-popup.component.html'
})
export class EnterprisesPopupComponent implements OnInit {
  currentUser: IdentityUserView;
  currentUserTemp: IdentityUserView;
  currentUserInfo: InfoUserView;
  currentCompany: EnterpriseView;
  public bussinessForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EnterprisesPopupComponent>,
    private _enterpriseService: EnterpriseService,
    private _infoUserService: InfoUserService,
    private _identityUserService: IdentityUserService,
    private _config: ConfigurationService
  ) { }

  public get name() { return this.bussinessForm.get('name') }
  public get email() { return this.bussinessForm.get('email') }
  public get isActive() { return this.bussinessForm.get('isActive') }
  public get city() { return this.bussinessForm.get('city') }
  public get address() { return this.bussinessForm.get('address') }
  public get phone() { return this.bussinessForm.get('phone') }
  public get identificationNumber() { return this.bussinessForm.get('identificationNumber') }
  public get identificationNumberCompany() { return this.bussinessForm.get('identificationNumberCompany') }
  public get businessName() { return this.bussinessForm.get('businessName') }
  public get businessCity() { return this.bussinessForm.get('businessCity') }
  public get businessAdress() { return this.bussinessForm.get('businessAdress') }
  public get businessPhone() { return this.bussinessForm.get('businessPhone') }
  public get priceIncreasePercentageValue() { return this.bussinessForm.get('priceIncreasePercentageValue') }
  public get contactSellerLink() { return this.bussinessForm.get('contactSellerLink') }

  ngOnInit() {
    this.currentUser = this._config.GetCurrentUser();
    let idEnterprise = this.data?.payload?.enterpriseId;
    if (idEnterprise) {
      this._identityUserService.IdentityUserByEnterpriseId(idEnterprise).subscribe((infoUser: IdentityUserView[]) => {
        let firstOrDefault: IdentityUserView = infoUser[0] ?? null;
        let identityUserId = firstOrDefault?.identityUserId?.toString() ?? null;
        this.currentUserTemp = firstOrDefault
        if (identityUserId) {
          this._infoUserService.InfoUserByIdentityUserWithParamId(identityUserId).subscribe((result: InfoUserView) => {
            this.currentUserInfo = result
            this._enterpriseService.EnterpriseById2(idEnterprise).subscribe((company: EnterpriseView) => {
              this.currentCompany = company
              this.setForm(this.currentUserInfo, this.currentCompany)
            })
          });
          return;
        }
        this.currentUserInfo = null
        this._enterpriseService.EnterpriseById2(idEnterprise).subscribe((company: EnterpriseView) => {
          this.currentCompany = company
          this.setForm(this.currentUserInfo, this.currentCompany)
        })
      })
    }
    this.setForm(null, null);
  }

  setForm(formDataUser: any, formDataCompany: any = null) {
    this.bussinessForm = new FormGroup({
      name: new FormControl(this.currentUserTemp?.name, Validators.required),
      email: new FormControl(this.currentUserTemp?.email, Validators.required),
      isActive: new FormControl(formDataCompany?.isRegister, Validators.required),
      city: new FormControl(formDataUser?.city, Validators.required),
      address: new FormControl(formDataUser?.address, Validators.required),
      phone: new FormControl(formDataUser?.phone, Validators.required),
      identificationNumber: new FormControl(formDataUser?.identificationNumber, Validators.required),
      identificationNumberCompany: new FormControl(formDataCompany?.identificationNumber, Validators.required),
      businessName: new FormControl(formDataCompany?.businessName, Validators.required),
      businessCity: new FormControl(formDataCompany?.businessCity, Validators.required),
      businessAdress: new FormControl(formDataCompany?.businessAdress, Validators.required),
      businessPhone: new FormControl(formDataCompany?.businessPhone, Validators.required),
      priceIncreasePercentageValue: new FormControl(formDataCompany?.priceIncreasePercentageValue, []),
      contactSellerLink: new FormControl(formDataCompany?.contactSellerLink, []),
    })
  }

  onSubmit() {
    let objectToSend: IEnterpriseEditInfo = {
      businessAdress: this.businessAdress.value,
      businessCity: this.businessCity.value,
      businessName: this.businessName.value,
      businessPhone: this.businessPhone.value,
      contactPersonName: this.name.value,
      contactPersonEmail: this.email.value,
      contactSellerLink: this.contactSellerLink.value,
      enterpriseId: this.currentUserInfo.enterpriseId,
      identificationNumber: this.identificationNumberCompany.value,
      identificationNumberUser: this.identificationNumber.value,
      identityUserId: this.currentUserInfo.identityUserId,
      infoUserId: this.currentUserInfo.infoUserId,
      isRegister: this.isActive.value,
      userAdress: this.address.value,
      userCity: this.city.value,
      userPhone: this.phone.value,
      priceIncreasePercentageValue: this.priceIncreasePercentageValue.value
    }
    this.dialogRef.close(objectToSend)
  }
}
