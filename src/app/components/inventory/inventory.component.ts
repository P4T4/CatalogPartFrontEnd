import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { InventoryService } from 'app/services/inventory.service';
import { LoadProductView } from 'app/models/product';
import * as Notiflix from 'notiflix';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
    keys: string[];
    private _keysObligatories: string[] = [
        'Marca',
        'MarcaActiva',
        'referencia',
        'ReferenciaActiva',
        'CodigoProducto',
        'DescripcionProducto',
        'Cantidad',
        'Observacion',
        'PrecioUnitario',
        'CantMinima',
        'CantMaxima',
        'ProductoActivo'
    ];
    public touchForm: boolean = false;
    public validFormat: boolean = false;
    dataSheet = new Subject();
    private _dataToUpload: any[];
    @ViewChild('inputFile') inputFile: ElementRef;
    isExcelFile: boolean = false;
    amountFiles: boolean;
    fileName: string;

    public constructor(private _inventoryService: InventoryService) {

    }

    public get isvalidFile() { return this.isExcelFile; }
    public get hasDocuments() { return this.amountFiles; }

    ngOnInit(): void { }

    onChange(evt) {
        let data, header;
        const target: DataTransfer = <DataTransfer>(evt?.dataTransfer ?? evt.target);
        this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
        this.amountFiles = target.files.length >= 1;
        if (target.files.length > 1) {
            this.inputFile.nativeElement.value = '';
        }
        if (this.isExcelFile) {
            this.fileName = target.files[0].name;
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                data = XLSX.utils.sheet_to_json(ws);
            };

            reader.readAsBinaryString(target.files[0]);

            reader.onloadend = (e) => {
                this.touchForm = true;
                this.keys = Object.keys(data[0]);
                this.validFormat = this.validateKeysFromObligatories(this.keys);
                this.dataSheet.next(data)
                this._dataToUpload = data
            }
        } else {
            this.inputFile.nativeElement.value = '';
        }
    }

    removeData() {
        this.touchForm = false;
        this.validFormat = false;
        this.fileName = '';
        this.amountFiles = false;
        this.inputFile.nativeElement.value = '';
        this.dataSheet.next(null);
        this.keys = null;
    }

    uploadData() {
        console.log(this._dataToUpload);
        let dataToUpload: LoadProductView[] = [];
        this._dataToUpload.map(data => {
            dataToUpload.push({
                tradeMarkName: data['Marca'],
                tradeMarkIsActive: data['MarcaActiva'],
                referenceTradeMarkName: data['referencia'],
                referenceTradeMarkIsActive: data['ReferenciaActiva'],
                productCodeReference: data['CodigoProducto'],
                productDescription: data['DescripcionProducto'],
                productQuantity: data['Cantidad'],
                productUnitPrice: data['PrecioUnitario'],
                productMinimumItem: data['CantMaxima'],
                productMaxItem: data['CantMinima'],
                productIsAvailable: data['ProductoActivo'],
                productObservation: data['Observacion'] ?? ''
            });
        })
        this.insertData(dataToUpload, 0);
    }

    private insertData(data: LoadProductView[], index: number) {
        let dataLength: number = data.length >= (index + 100) ? index + 100 : data.length;
        let insert100Records: LoadProductView[] = data.slice(index, dataLength);
        console.log(dataLength, insert100Records);
        Notiflix.Loading.hourglass(`Cargando del ${index} al ${dataLength}`);
        this._inventoryService.uploadInventory(insert100Records).subscribe(result => {
            console.log(result);
            Notiflix.Loading.remove();
            Notiflix.Notify.success(`Registros del ${index} al ${dataLength} cargados`);
        }, error => {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(`Problemas al cargar estos registros del: ${index} al ${dataLength}`);
            console.error(error);
        }, () => {
            if (dataLength == data.length) {
                Swal.fire('Mensaje del sistema', 'Infomación cargada satisfactoriamente', 'success').then(() => {
                    this.removeData();
                });
                return;
            }
            this.insertData(data, index + 100)
        })
    }

    validateKeysFromObligatories(keysToValidate: string[]): boolean {
        return this._keysObligatories.filter((key: string, index: number) => keysToValidate[index] == key).length == keysToValidate.length;
    }
}
