import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TradeMarkView } from 'app/models/tradeMark';
import { ErrorService } from 'app/services/error.service';
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
  private isEdit: boolean = false;
  public tradeMarkForm: FormGroup;
  private initialValue: TradeMarkView = {
    codeExternalFrame: '',
    isActive: false,
    isExternalFrame: false,
    tradeMarkCode: null,
    tradeMarkId: null,
    tradeMarkImage64: '',
    tradeMarkName: ''
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
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TradeMarkView,
    private _errorService: ErrorService
  ) {
    this.isEdit = data != null;
    let formValues: TradeMarkView = data ?? this.initialValue
    this.declareForm(formValues)
  }

  // public get tradeMarkCode() { return this.tradeMarkForm.get('tradeMarkCode'); }
  public get tradeMarkName() { return this.tradeMarkForm.get('tradeMarkName'); }
  public get tradeMarkImage64() { return this.tradeMarkForm.get('tradeMarkImage64'); }
  public get isActive() { return this.tradeMarkForm.get('isActive'); }
  public get isExternalFrame() { return this.tradeMarkForm.get('isExternalFrame'); }
  public get codeExternalFrame() { return this.tradeMarkForm.get('codeExternalFrame'); }

  declareForm(setForm: TradeMarkView) {
    this.tradeMarkForm = new FormGroup({
      // tradeMarkId: new FormControl(setForm.tradeMarkId, Validators.required),
      // tradeMarkCode: new FormControl(setForm.tradeMarkCode, Validators.required),
      // tradeMarkImage64: new FormControl(setForm.tradeMarkImage64, Validators.required),
      tradeMarkName: new FormControl(setForm.tradeMarkName, Validators.required),
      isActive: new FormControl(setForm.isActive, Validators.required),
      isExternalFrame: new FormControl(setForm.isExternalFrame, []),
      codeExternalFrame: new FormControl(setForm.codeExternalFrame, []),
    })
    if (setForm.tradeMarkImage64 != '') {
      this.fileBase64 = setForm.tradeMarkImage64
      this.fileNameOrMessage = 'Logo Empresa'
    }
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.fileBase64);
  }

  onNoClick(operation: string): void {
    if (this.tradeMarkForm.invalid && operation == 'save') {
      this._errorService.SwalAlert('Error en el formulario', 'formulario invalido, verifique por favor', 'error')
      return
    }
    if (operation == 'cancel') {
      this.dialogRef.close(null)
      return
    }
    let form = this.isEdit
      ? {
        ...this.tradeMarkForm.value,
        tradeMarkId: this.data.tradeMarkId,
        tradeMarkImage64: this.fileBase64,
        tradeMarkCode: this.data.tradeMarkCode
      }
      : {
        ...this.tradeMarkForm.value,
        tradeMarkImage64: this.fileBase64,
        tradeMarkCode: '0'
      }
    let save = {
      type: this.isEdit ? 'Update' : 'Save',
      form
    }
    this.dialogRef.close(save);
  }

  ngOnInit(): void {
  }

}
