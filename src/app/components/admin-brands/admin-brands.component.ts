import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { RouteTradeMark, TradeMarkView } from 'app/models/tradeMark';
import { IdentityUserView } from 'app/models/user';
import { ConfigurationService } from 'app/services/configuration.service';
import { ErrorService } from 'app/services/error.service';
import { TradeMarkService } from 'app/services/trade-mark.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { map } from 'rxjs/operators';
import { FormComponent } from './form/form.component';

@Component({
    selector: 'app-admin-brands',
    templateUrl: './admin-brands.component.html',
    styleUrls: ['./admin-brands.component.scss']
})
export class AdminBrandsComponent implements OnInit {
    userView: IdentityUserView;
    columnas: string[] = ['tradeMarkId', 'tradeMarkName', 'isActive', 'tradeMarkCode'];
    dataSource: MatTableDataSource<TradeMarkView>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    objectToEdit: TradeMarkView | null;
    selection: any;
    selected_temporal: any = null;

    constructor(
        public dialog: MatDialog,
        private tradeMarkService: TradeMarkService,
        private _errorService: ErrorService,
        private _loader: AppLoaderService,
        private _sanitizer: DomSanitizer,
        private _configService: ConfigurationService
    ) {
        this.userView = _configService.GetCurrentUser();
        const initialSelection = [];
        const allowMultiSelect = true;
        this.selection = new SelectionModel<TradeMarkView>(allowMultiSelect, initialSelection)
    }

    public get hasSelectedChecked() { return this.selection.selected.length == 1; }

    ngOnInit() {
        this.getList()
    }

    public filterTable(data: TradeMarkView, filter: string) {
        if (!filter) return true;
        let filterColumns = ['tradeMarkName', 'tradeMarkCode'];
        return filterColumns.filter((fieldToFilter: string) => data[fieldToFilter].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0).length > 0
    }

    getList() {
        this._loader.open()
        let route: string = this.userView?.identityUserId ? RouteTradeMark.RouteGetAll : RouteTradeMark.RouteGetAllActive;
        this.tradeMarkService.AllTradeMarkAvaible(route).subscribe((result: TradeMarkView[]) => {
            this._loader.close()
            this.dataSource = new MatTableDataSource<TradeMarkView>(result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = this.filterTable;
            console.log(result)
        }, error => {
            this._loader.close()
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
        })
    }

    openDialog(): void {
        this.objectToEdit = this.selection.selected[0] ?? null;
        const dialogRef = this.dialog.open(FormComponent, {
            width: '720px',
            data: this.objectToEdit,
            panelClass: 'custom-panel'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result?.type) {
                let objectToSave: TradeMarkView = { ...result.form };
                if (result.type == 'Update') {
                    this.tradeMarkService.updateTradeMark(objectToSave).subscribe(result => {
                        console.log(result)
                        this.selection.clear()
                        this._errorService.SwalAlert('Marca actualizada', 'marca actualizada satisfactoriamente', 'success');
                        this.getList()
                    }, error => {
                        var message = this._errorService.HadlingError(error);
                        this._errorService.SwalAlert(message.message, '', message.type);
                    })
                    return;
                }
                objectToSave = { ...objectToSave, tradeMarkId: null }
                this.tradeMarkService.saveTradeMark(objectToSave).subscribe(result => {
                    this._errorService.SwalAlert('Marca creada', 'marca creada satisfactoriamente', 'success');
                    console.log(result)
                    this.selection.clear()
                    this.getList()
                }, error => {
                    var message = this._errorService.HadlingError(error);
                    this._errorService.SwalAlert(message.message, '', message.type);
                })
            }
            console.log('The dialog was closed', result);
            // this.objectToEdit = result;
        });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.selection.selected.length != this.dataSource.data.length) {
            this.selection.clear()
            this.dataSource.data.forEach(row => this.selection.select(row));
            return;
        }
        this.selection.clear()
    }

    individualSelection(marca: any, event: MatSlideToggleChange) {
        this.selection.clear()
        if (event.checked) {
            this.selection.select(marca)
            this.selected_temporal = marca
            return;
        }
        this.selection.deselect(marca)
        this.selected_temporal = null
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
