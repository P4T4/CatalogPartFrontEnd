import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ReferenceTradeMarkView, TradeMarkView } from 'app/models/tradeMark';
import { ErrorService } from 'app/services/error.service';
import { ReferenceTradeMarkService } from 'app/services/reference-trade-mark.service';
import { TradeMarkService } from 'app/services/trade-mark.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { map } from 'rxjs/operators';
import { FormComponent } from './form/form.component';

class Articulo {
    constructor(public codigo: number, public descripcion: string, public precio: number) {
    }
}

@Component({
    selector: 'app-admin-reference-trade-mark',
    templateUrl: './admin-reference-trade-mark.component.html',
    styleUrls: ['./admin-reference-trade-mark.component.scss']
})
export class AdminReferenceTradeMarkComponent implements OnInit {
    columnas: string[] = ['referenceTradeMarkId', 'tradeMarkName', 'referenceCode', 'referenceName', 'isActive'];
    dataSource: MatTableDataSource<ReferenceTradeMarkView>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    objectToEdit: ReferenceTradeMarkView | null;
    selection: any;
    selected_temporal: any = null;

    constructor(
        public dialog: MatDialog,
        private referenceTradeMarkService: ReferenceTradeMarkService,
        private _errorService: ErrorService,
        private _loader: AppLoaderService,
        private _sanitizer: DomSanitizer
    ) {
        const initialSelection = [];
        const allowMultiSelect = true;
        this.selection = new SelectionModel<ReferenceTradeMarkView>(allowMultiSelect, initialSelection)
    }

    public get hasSelectedChecked() {
        return this.selection.selected.length == 1;
    }

    ngOnInit() {
        this.getList()
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    getList() {
        this._loader.open()
        this.referenceTradeMarkService.AllReferenceTradeMarkAvaible().subscribe((result: ReferenceTradeMarkView[]) => {
            this._loader.close()
            this.dataSource = new MatTableDataSource<ReferenceTradeMarkView>(result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = this.filterTable;
            console.log(result)
        }, error => {
            this._loader.close()
            error.error = error
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
        })
    }

    openDialog(event): void {
        this.objectToEdit = event;
        const dialogRef = this.dialog.open(FormComponent, {
            width: '720px',
            data: this.objectToEdit
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result?.type) {
                let objectToSave: ReferenceTradeMarkView = {
                    ...result.form
                };
                if (result.type == 'Update') {
                    this.referenceTradeMarkService.updateReferenceTradeMark(objectToSave).subscribe(result => {
                        console.log(result)
                        this.selection.clear()
                        this._errorService.SwalAlert('Referencia actualizada', 'Referencia actualizada satisfactoriamente', 'success');
                        this.getList()
                    }, error => {
                        error.error = error
                        var message = this._errorService.HadlingError(error);
                        this._errorService.SwalAlert(message.message, '', message.type);
                    })
                    return;
                }
                objectToSave = { ...objectToSave, referenceTradeMarkId: null }
                this.referenceTradeMarkService.saveReferenceTradeMark(objectToSave).subscribe(result => {
                    console.log(result)
                    this.selection.clear()
                    this._errorService.SwalAlert('Referencia creada', 'Referencia creada satisfactoriamente', 'success');
                    this.getList()
                }, error => {
                    error.error = error
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
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
        console.log(this.selection);
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

    public filterTable(data: ReferenceTradeMarkView, filter: string) {
        if (!filter) return true;
        let filterColumns = ['tradeMarkName', 'referenceCode', 'referenceName'];
        return filterColumns.filter((fieldToFilter: string) => data[fieldToFilter].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0).length > 0
    }

}
