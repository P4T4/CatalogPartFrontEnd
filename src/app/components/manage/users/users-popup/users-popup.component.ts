import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnterpriseView } from 'app/models/business';
import { IdentityUserView, InfoUserView, TypeUser } from 'app/models/user';
import { InfoUserService } from 'app/services/info-user.service';
import { ErrorService } from 'app/services/error.service';

@Component({
  selector: 'app-users-popup',
  templateUrl: './users-popup.component.html'
})
export class UsersPopupComponent implements OnInit {
  public itemForm: FormGroup;
  public companiesList: EnterpriseView[] = [];
  private userView: IdentityUserView;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsersPopupComponent>,
    private fb: FormBuilder,
    private _errorService: ErrorService,
    private _infoUserService: InfoUserService
  ) { }

  public get isAdmin() { return this.userView?.typeUser == TypeUser.Admin; }
  public get enterpriseNameClientAdmin() { return this.companiesList.filter((enterprise: EnterpriseView) => enterprise.enterpriseId == this.userView?.enterpriseId)[0]; }
  // FORM
  public get name() { return this.itemForm.get('name'); }
  public get email() { return this.itemForm.get('email'); }
  public get identification() { return this.itemForm.get('identification'); }
  public get city() { return this.itemForm.get('city'); }
  public get phone() { return this.itemForm.get('phone'); }
  public get address() { return this.itemForm.get('address'); }
  public get enterprise() { return this.itemForm.get('enterprise'); }

  ngOnInit() {
    console.log(this.data);
    this.userView = this.data.currentUser;
    this.buildItemForm(null, null)
    if (this.data.payload) {
      this._infoUserService
        .InfoUserByIdentityUser()
        .subscribe(
          (result: InfoUserView) => {
            this.buildItemForm(this.data.payload, result)
          },
          error => {
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
          }
        )
    }
    this.companiesList = this.data?.enterprises ?? [];
  }

  buildItemForm(item: IdentityUserView, itemAditional: InfoUserView) {
    console.log(item, itemAditional)
    if (!this.isAdmin) {
      item.enterpriseId = this.userView.enterpriseId;
    }
    this.itemForm = this.fb.group({
      name: [item?.name || '', Validators.required],
      email: [item?.email || '', Validators.required],
      identification: [itemAditional?.identificationNumber || '', Validators.required],
      city: [itemAditional?.city || '', Validators.required],
      phone: [itemAditional?.phone || '', Validators.required],
      address: [itemAditional?.address || '', Validators.required],
      enterprise: [item?.enterpriseId || ''],
      // isActive: [item?.isActive || false]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
