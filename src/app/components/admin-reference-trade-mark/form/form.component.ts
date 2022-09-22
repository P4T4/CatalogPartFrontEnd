import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenceTradeMarkView, RouteTradeMark, TradeMarkView } from 'app/models/tradeMark';
import { IdentityUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { ErrorService } from 'app/services/error.service';
import { TradeMarkService } from 'app/services/trade-mark.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public tradeMarkList: TradeMarkView[] = [];
  private isEdit: boolean = false;
  public referenceTradeMarkForm: FormGroup;
  private initialValue: ReferenceTradeMarkView = {
    isActive: false,
    referenceCode: null,
    referenceName: '',
    referenceTradeMarkId: null,
    tradeMarkId: null
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReferenceTradeMarkView,
    private _errorService: ErrorService,
    private tradeMarkService: TradeMarkService,
  ) {
    this.isEdit = data != null;
    let formValues: ReferenceTradeMarkView = data ?? this.initialValue
    this.declareForm(formValues)
  }

  public get isActive() { return this.referenceTradeMarkForm.get('isActive'); }
  public get referenceCode() { return this.referenceTradeMarkForm.get('referenceCode'); }
  public get referenceName() { return this.referenceTradeMarkForm.get('referenceName'); }
  public get tradeMarkId() { return this.referenceTradeMarkForm.get('tradeMarkId'); }

  ngOnInit(): void {
    let route: string = RouteTradeMark.RouteGetAllActive;
    this.tradeMarkService.AllTradeMarkAvaible(route).subscribe((result: TradeMarkView[]) => {
      this.tradeMarkList = result
    }, error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }

  declareForm(setForm: ReferenceTradeMarkView) {
    this.referenceTradeMarkForm = new FormGroup({
      // referenceCode: new FormControl(setForm.referenceCode, Validators.required),
      // referenceTradeMarkId: new FormControl(setForm.referenceTradeMarkId, Validators.required),
      isActive: new FormControl(setForm.isActive, Validators.required),
      referenceName: new FormControl(setForm.referenceName, Validators.required),
      tradeMarkId: new FormControl(setForm.tradeMarkId, []),
    })
  }

  onNoClick(operation: string): void {
    if (this.referenceTradeMarkForm.invalid && operation == 'save') {
      this._errorService.SwalAlert('Error en el formulario', 'formulario invalido, verifique por favor', 'error')
      return
    }
    if (operation == 'cancel') {
      this.dialogRef.close(null)
      return
    }
    let form: ReferenceTradeMarkView = this.isEdit
      ? {
        ...this.referenceTradeMarkForm.value,
        referenceTradeMarkId: this.data.referenceTradeMarkId,
        referenceCode: this.data.referenceCode
      }
      : {
        ...this.referenceTradeMarkForm.value,
        referenceTradeMarkId: '',
        referenceCode: '0'
      }
    let save = {
      type: this.isEdit ? 'Update' : 'Save',
      form
    }
    this.dialogRef.close(save);
  }

}
