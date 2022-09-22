import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { IPurchaseRequestView, IPurchaseResponseView } from 'app/models/purchase';
import { IdentityUserView, TypeUser } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { ErrorService } from 'app/services/error.service';
import { PurchaseProductService } from 'app/services/purchase-product.service';
import { PurchaseService } from 'app/services/purchase.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { FormModalComponent } from './form-modal/form-modal.component';

@Component({
    selector: 'app-admin-purchase',
    templateUrl: './admin-purchase.component.html',
    styleUrls: ['./admin-purchase.component.scss']
})
export class AdminPurchaseComponent implements OnInit {
    userView: IdentityUserView;
    columnas: string[] = [
        'numberOrder',
        'createdDate',
        'subTotal',
        'taxValue',
        'discountValue',
        'total',
        'transactionState'
    ];
    productViewArray: IPurchaseResponseView[];
    dataSource: MatTableDataSource<IPurchaseResponseView>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    objectToEdit: IPurchaseResponseView | null;
    selection: any;
    selected_temporal: any = null;

    constructor(
        public dialog: MatDialog,
        private _purchaseService: PurchaseService,
        private _purchaseProductService: PurchaseProductService,
        private _errorService: ErrorService,
        private _loader: AppLoaderService,
        private cdr: ChangeDetectorRef,
        private _sanitizer: DomSanitizer,
        private _configService: ConfigurationService
    ) {
        this.userView = _configService.GetCurrentUser();
        const initialSelection = [];
        const allowMultiSelect = true;
        this.selection = new SelectionModel<IPurchaseResponseView>(allowMultiSelect, initialSelection)
    }

    public get hasSelectedChecked() {
        return this.selection.selected.length == 1;
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<IPurchaseResponseView>([])
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.getList();
    }

    getList() {
        this._loader.open();
        let objectToSend: IPurchaseRequestView = {
            businessName: '',
            dateBegin: '',
            dateEnd: '',
            email: '',
            identificationNumber: '',
            name: '',
            numberOrder: 0,
            transactionState: 0,
            typeUser: this.userView.typeUser,
            enterpriseId: null,
            identityUserId: null
        }
        if (this.userView.typeUser == TypeUser.ClientPerson || this.userView.typeUser == TypeUser.ClientUserEnterprise) {
            objectToSend = { ...objectToSend, identityUserId: this.userView.identityUserId }
        }
        if (this.userView.typeUser == TypeUser.ClientAdminEnterprise) {
            objectToSend = { ...objectToSend, enterpriseId: this.userView.enterpriseId }
        }
        this._purchaseService.getListByTypeUser(objectToSend).subscribe((success: IPurchaseResponseView[]) => {
            this._loader.close()
            this.dataSource = new MatTableDataSource<IPurchaseResponseView>(success);
            this.cdr.detectChanges()
        }, error => {
            this._loader.close()
            error.error = error
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
        })
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    openDialog(payload: IPurchaseResponseView): void {
        this.objectToEdit = this.selection.selected[0] ?? payload ?? null;
        const dialogRef = this.dialog.open(FormModalComponent, {
            width: '80%',
            data: this.objectToEdit,
            panelClass: 'custom-panel'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result?.payload != null && typeof result?.payload != 'undefined' && result?.reason == 'Save') {
                this._loader.open();
                this._purchaseProductService.changeStatePurchase(result.payload).subscribe(result => {
                    this._loader.close()
                    console.log(result)
                }, error => {
                    this._loader.close()
                    error.error = error
                    var message = this._errorService.HadlingError(error);
                    this._errorService.SwalAlert(message.message, '', message.type);
                })
            }
        });
    }
}
