import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ReferenceTradeMarkView, RouteTradeMark, TradeMarkView } from 'app/models/tradeMark';
import { IdentityUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { ErrorService } from 'app/services/error.service';
import { ReferenceTradeMarkService } from 'app/services/reference-trade-mark.service';
import { TradeMarkService } from 'app/services/trade-mark.service';

@Component({
  selector: 'app-filter-form-table',
  templateUrl: './filter-form-table.component.html',
  styleUrls: ['./filter-form-table.component.css']
})
export class FilterFormTableComponent implements OnInit {
  @Output() onSubmitFilter: EventEmitter<any> = new EventEmitter<any>()
  public filterFormTableGroupForm: FormGroup;
  private userView: IdentityUserView;
  public referenceTradeMarkList: ReferenceTradeMarkView[] = [];
  public tradeMarkList: TradeMarkView[] = [];

  constructor(
    private _errorService: ErrorService,
    private tradeMarkService: TradeMarkService,
    private referenceTradeMarkService: ReferenceTradeMarkService
  ) {
  }

  public get tradeMarkId() { return this.filterFormTableGroupForm.get('tradeMarkId') }
  public get referenceTradeMarkId() { return this.filterFormTableGroupForm.get('referenceTradeMarkId') }

  ngOnInit(): void {
    let route: string = RouteTradeMark.RouteGetAllActive;
    this.tradeMarkService.AllTradeMarkAvaible(route).subscribe((result: TradeMarkView[]) => {
      this.tradeMarkList = result
    }, error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
    this.filterFormTableGroupForm = new FormGroup({
      tradeMarkId: new FormControl('', Validators.required),
      referenceTradeMarkId: new FormControl('', /* Validators.required */[]),
    })
  }

  onSubmit(): void {
    if (this.filterFormTableGroupForm.invalid) {
      return
    }
    this.onSubmitFilter.emit(this.filterFormTableGroupForm.value)
  }

  onChangeTradeMark(event: MatSelectChange) {
    this.referenceTradeMarkService.ModelTradeMarkByMarkId(event.value).subscribe((result: ReferenceTradeMarkView[]) => {
      this.referenceTradeMarkList = result
    }, error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    })
  }

}
