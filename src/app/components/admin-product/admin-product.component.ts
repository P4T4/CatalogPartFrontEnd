import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductView } from 'app/models/product';
import { ErrorService } from 'app/services/error.service';
import { ProductService } from 'app/services/product.service';
import { TradeMarkService } from 'app/services/trade-mark.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { map } from 'rxjs/operators';
import { FormComponent } from './form/form.component';

class Articulo {
    constructor(public codigo: number, public descripcion: string, public precio: number) {
    }
}

@Component({
    selector: 'app-admin-product',
    templateUrl: './admin-product.component.html',
    styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
    temporalListVariables: any = {};
    columnas: string[] = ['productId', 'codeReference', 'description', 'quantity', 'unitPrice', 'isAvailable', 'maximumItem', 'minimumItem'];
    productViewArray: ProductView[];
    dataSource: MatTableDataSource<ProductView>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    objectToEdit: ProductView | null;
    selection: any;
    selected_temporal: any = null;

    constructor(
        public dialog: MatDialog,
        private productService: ProductService,
        private _errorService: ErrorService,
        private _loader: AppLoaderService,
        private cdr: ChangeDetectorRef,
        private _sanitizer: DomSanitizer
    ) {
        const initialSelection = [];
        const allowMultiSelect = true;
        this.selection = new SelectionModel<ProductView>(allowMultiSelect, initialSelection)
    }

    public get hasSelectedChecked() {
        return this.selection.selected.length == 1;
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<ProductView>([])
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        this.dataSource.filterPredicate = this.filterTable
    }

    public filterTable(data: ProductView, filter: string) {
        if (!filter) return true;
        let filterColumns = ['codeReference', 'description', 'quantity', 'unitPrice', 'maximumItem', 'minimumItem'];
        return filterColumns.filter((fieldToFilter: string) => data[fieldToFilter].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0).length > 0
    }

    public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

    getList(event: any) {
        this.temporalListVariables = event;
        console.log(event)
        let referenceTradeMarkId = event.referenceTradeMarkId/*  == '' ? '0' : event.referenceTradeMarkId */;
        this._loader.open()
        this.productService.getProductByMarkAndReference(event.tradeMarkId, referenceTradeMarkId).subscribe((result: ProductView[]) => {
            this.dataSource = new MatTableDataSource<ProductView>(result);
            this.cdr.detectChanges()
        }, (error) => {
            this._loader.close()
            error.error = error
            var message = this._errorService.HadlingError(error);
            this._errorService.SwalAlert(message.message, '', message.type);
        }, () => {
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort
            this._loader.close()
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
                let objectToSave: ProductView = { ...result.form };
                if (result.type == 'Update') {
                    this.productService.updateProduct(objectToSave).subscribe(result => {
                        console.log(result)
                        this.selection.clear()
                        this._errorService.SwalAlert('Producto actualizado', 'Producto actualizado satisfactoriamente', 'success');
                        this.getList(this.temporalListVariables)
                    }, (error) => {
                        error.error = error
                        var message = this._errorService.HadlingError(error);
                        this._errorService.SwalAlert(message.message, '', message.type);
                    })
                    return;
                }
                objectToSave = { ...objectToSave, productId: null }
                this.productService.saveProduct(objectToSave).subscribe(result => {
                    console.log(result)
                    this.selection.clear()
                    this._errorService.SwalAlert('Producto creado', 'Producto creado satisfactoriamente', 'success');
                    this.getList(this.temporalListVariables)
                }, (error) => {
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

    individualSelection(marca) {
        this.selection.toggle(marca)
        this.selected_temporal = marca
    }

}
