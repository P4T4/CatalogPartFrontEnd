import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseProductService } from 'app/services/purchase-product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChangeStateProduct, IChangeStatePurchaseProduct, IPurchasedProductResponseView, IPurchaseResponseView, TransactionStateType, TransactionStateTypeName } from 'app/models/purchase';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  boolChecked: boolean[] = [];
  columnas: string[] = ['codeReference', 'tradeMarkName', 'totalProductPrice', 'purchaseProductState', 'purchaseProductStateCurrent', 'observation'];
  dataSource: MatTableDataSource<IPurchasedProductResponseView>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _purchaseProductService: PurchaseProductService,
    @Inject(MAT_DIALOG_DATA) public data: IPurchaseResponseView,
    public dialogRef: MatDialogRef<FormModalComponent>,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.setList([]);
    this.getList();
  }

  public getNameState(idState: number) { return TransactionStateTypeName.states.filter(x => x.idState == idState)[0]?.name }

  changeValueChecked(i: number) {
    this.boolChecked[i] = !this.boolChecked[i];
  }

  setList(arrayToSetList: IPurchasedProductResponseView[]) {
    this.dataSource = new MatTableDataSource<IPurchasedProductResponseView>(arrayToSetList);
    this.boolChecked = arrayToSetList.map(x => false);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  getList() {
    this._purchaseProductService.getListByPurchaseId(this.data.purchaseId).subscribe((result: IPurchasedProductResponseView[]) => {
      this.setList(result);
    }, error => {

    })
  }

  onclick(closeMotive: string) {
    if (closeMotive == 'Close') {
      this.dialogRef.close({ reason: closeMotive, payload: null });
    }
    let products: IChangeStateProduct[] = this.dataSource.data.map((item: IPurchasedProductResponseView, index: number) => {
      let objectToChangeProductState: IChangeStateProduct = {
        observation: null,
        productId: null,
        purchaseProductState: null
      }
      if (!this.boolChecked[index]) {
        debugger;
        let inputValue: string = (<HTMLInputElement>document.getElementById('observation' + index))?.value ?? '';
        objectToChangeProductState = {
          ...objectToChangeProductState,
          observation: inputValue,
          purchaseProductState: TransactionStateType.Cancelled,
          productId: item.productId.toString()
        };
        return objectToChangeProductState;
      }
      objectToChangeProductState = {
        ...objectToChangeProductState,
        productId: item.productId.toString(),
        purchaseProductState: item.purchaseProductState + 1
      };
      return objectToChangeProductState;
    })
    let payload: IChangeStatePurchaseProduct = {
      purchaseId: this.dataSource.data[0].purchaseId.toString(),
      productChangeStateView: products
    }
    this.dialogRef.close({ reason: closeMotive, payload });
  }
}
