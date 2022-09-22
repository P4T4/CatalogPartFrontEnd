import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConditionsAndTerms } from 'app/models/tyc';
import { ErrorService } from 'app/services/error.service';
import { TycService } from 'app/services/tyc.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-tyc-modal',
  templateUrl: './tyc-modal.component.html',
  styleUrls: ['./tyc-modal.component.css']
})
export class TycModalComponent implements OnInit {
  public tycText: string = '...'

  constructor(
    public dialogRef: MatDialogRef<TycModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loader: AppLoaderService,
    private _errorService: ErrorService,
    private tyc: TycService
  ) { }

  ngOnInit(): void {
    this.loader.open()
    this.tyc.getConditionsAndTerms().subscribe((result: IConditionsAndTerms) => {
      this.tycText = result?.description
      this.loader.close()
    }, error => {
      var message = this._errorService.HadlingError(error);
      this.loader.close();
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
