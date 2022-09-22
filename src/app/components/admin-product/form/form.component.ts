import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductView } from 'app/models/product';
import { ReferenceTradeMarkView, RouteTradeMark, TradeMarkView } from 'app/models/tradeMark';
import { ErrorService } from 'app/services/error.service';
import { ReferenceTradeMarkService } from 'app/services/reference-trade-mark.service';
import { TradeMarkService } from 'app/services/trade-mark.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public background: string = '';
  public fileBase64: string = '';
  public fileNameOrMessage: string = 'o arrastra y suelta archivos aquí';
  public tradeMarkList: TradeMarkView[] = []
  public referenceTradeMarkList: ReferenceTradeMarkView[] = []
  private isEdit: boolean = false;
  public productForm: FormGroup;
  private initialValue: ProductView = {
    codeReference: '',
    description: '',
    imageBase64: '',
    isAvailable: false,
    maximumItem: null,
    minimumItem: null,
    observation: '',
    productId: null,
    quantity: null,
    referenceTradeMarkId: null,
    tradeMarkId: null,
    unitPrice: null
  }
  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }
  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '';
    if (evt.dataTransfer.files.length > 0) {
      this.setFile(evt.dataTransfer.files);
    }
  }

  setFile(files: FileList | File[]) {
    this.fileNameOrMessage = files[0].name
    this.convertFile(files[0]).subscribe(base64 => { this.fileBase64 = base64; });
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next('data:' + file.type + ';base64,' + btoa(event.target.result.toString()));
    return result;
  }

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductView,
    private _errorService: ErrorService,
    private tradeMarkService: TradeMarkService,
    private sanitizer: DomSanitizer,
    private referenceTradeMarkService: ReferenceTradeMarkService
  ) {
    this.isEdit = data != null;
    let formValues: ProductView = data ?? this.initialValue
    this.declareForm(formValues)
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.fileBase64);
  }

  public get codeReference() { return this.productForm.get('codeReference') }
  public get description() { return this.productForm.get('description') }
  public get imageBase64() { return this.productForm.get('imageBase64') }
  public get isAvailable() { return this.productForm.get('isAvailable') }
  public get maximumItem() { return this.productForm.get('maximumItem') }
  public get minimumItem() { return this.productForm.get('minimumItem') }
  public get observation() { return this.productForm.get('observation') }
  public get quantity() { return this.productForm.get('quantity') }
  public get referenceTradeMarkId() { return this.productForm.get('referenceTradeMarkId') }
  public get tradeMarkId() { return this.productForm.get('tradeMarkId') }
  public get unitPrice() { return this.productForm.get('unitPrice') }

  declareForm(setForm: ProductView) {
    this.productForm = new FormGroup({
      codeReference: new FormControl(setForm.codeReference, Validators.required),
      description: new FormControl(setForm.description, Validators.required),
      imageBase64: new FormControl(setForm.imageBase64, []),
      isAvailable: new FormControl(setForm.isAvailable, Validators.required),
      maximumItem: new FormControl(setForm.maximumItem, Validators.required),
      minimumItem: new FormControl(setForm.minimumItem, Validators.required),
      observation: new FormControl(setForm.observation, []),
      quantity: new FormControl(setForm.quantity, Validators.required),
      referenceTradeMarkId: new FormControl(setForm.referenceTradeMarkId, Validators.required),
      tradeMarkId: new FormControl(setForm.tradeMarkId, Validators.required),
      unitPrice: new FormControl(setForm.unitPrice, Validators.required),

    })
    if (setForm.imageBase64 != '') {
      this.fileBase64 = setForm.imageBase64
      this.fileNameOrMessage = 'Logo Empresa'
    }
  }

  onNoClick(operation: string): void {
    if (this.productForm.invalid && operation == 'save') {
      this._errorService.SwalAlert('Error en el formulario', 'formulario invalido, verifique por favor', 'error')
      return
    }
    if (operation == 'cancel') {
      this.dialogRef.close(null)
      return
    }
    let form: ProductView = this.isEdit
      ? {
        ...this.productForm.value,
        productId: this.data.productId,
        imageBase64: this.fileBase64
      }
      : {
        ...this.productForm.value,
        imageBase64: this.fileBase64
      }
    let save = {
      type: this.isEdit ? 'Update' : 'Save',
      form
    }
    this.dialogRef.close(save);
  }

  ngOnInit(): void {
    let route: string = RouteTradeMark.RouteGetAllActive;
    this.tradeMarkService.AllTradeMarkAvaible(route).subscribe((result: TradeMarkView[]) => {
      this.tradeMarkList = result
    }, error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
    /* this.referenceTradeMarkService.AllReferenceTradeMarkAvaible().subscribe((result: ReferenceTradeMarkView[]) => {
      this.referenceTradeMarkList = result
    }, error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    }) */
  }

  onChangeTradeMark(event: MatSelectChange) {
    this.referenceTradeMarkService.ModelTradeMarkByMarkId(event.value).subscribe((result: ReferenceTradeMarkView[]) => {
      console.log(result)
      this.referenceTradeMarkList = result
    }, error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }

}
