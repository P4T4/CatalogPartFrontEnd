import { Component, OnInit, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'app/services/product.service';
import { ProductView } from 'app/models/product';

import 'datatables.net';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-model',
  templateUrl: './productModel.component.html',
  styleUrls: ['./productModel.component.css']
})
export class ProductModelComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = [];
  dataSource: any;

  public productView: ProductView[];
  public content: boolean;
  public modelID: Guid;
  public marcaID: Guid;
  public holi: boolean;

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,  
              private _errorService: ErrorService,            
              private _productService: ProductService) { 
                this.content = false;
                this.activatedRoute.params.subscribe(parametros => {
                  this.modelID = parametros['modeloID'];
                  this.marcaID = parametros['markID'];
                }); 
              }

  ngOnInit() {
    this.GetProductByModelId();    
  }

  GetProductByModelId() {
    this._productService.GetProductId(this.modelID)
    .subscribe((response: ProductView[]) => { 
       this.productView = response;
       console.log('GetProductId', this.productView);
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      
      this.content = true;
      
      this.displayedColumns = ['codeReference','description', 'unitPrice', 'action'];      
      this.dataSource = new MatTableDataSource(this.productView);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      }, 600);

    });
  }

  viewProductDet(productID: string){
    console.log("El ID del producto seleccionado es: ", productID);
    this.router.navigate(['/detproducto', productID, this.modelID]);
  }

  Back(){
    console.log("Regresar a la pagina de modelo ", this.marcaID);
    this.router.navigate(['/modelos', this.productView[0].tradeMarkId]);
  }
}
