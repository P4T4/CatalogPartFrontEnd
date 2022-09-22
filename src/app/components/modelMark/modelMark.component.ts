import { Component, OnInit, ViewChild } from '@angular/core';
import { TradeMarkView, ReferenceTradeMarkView } from 'app/models/tradeMark';
import { Guid } from 'guid-typescript';
import { Router, ActivatedRoute } from '@angular/router';
import { ReferenceTradeMarkService } from '../../services/reference-trade-mark.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TablesService } from '../../views/tables/tables.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-model',
  templateUrl: './modelMark.component.html',
  styleUrls: ['./modelMark.component.css']
})
export class ModelMarkComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  public referenceTradeMarkList: ReferenceTradeMarkView[];
  public content: boolean;
  public markID: Guid;
  

    
  displayedColumns: string[] = [];
  dataSource: any;

  pruebadisplayedColumns: string[] = [];
  public prueba: any;

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,
              private tableService: TablesService,
              private loader: AppLoaderService,
              private _referenceTradeMarkService: ReferenceTradeMarkService) { 
                this.content = false;
                this.activatedRoute.params.subscribe(parametros => {
                  //this.type = parametros['type'];
                  this.markID = parametros['markID'];
                  console.log('this.markID', this.markID);
                }); 
              }

  ngOnInit() {
    this.getModelTradeMarkByMarkId();
  }

  getModelTradeMarkByMarkId() {
    this.loader.open();
    this._referenceTradeMarkService.ModelTradeMarkByMarkId(this.markID)
    .subscribe((response: ReferenceTradeMarkView[]) => { 
       this.referenceTradeMarkList = response;
       console.log('referenceTradeMarkList', this.referenceTradeMarkList);
    },
    error => {
      this.loader.close();
    },
    ()=> {
      this.loader.close();
      this.content = true;
    });
  }

  viewProduct(modelID: Guid) {
    //console.log('entro a navegar al producto', modelID);
    //this.router.navigate(['/productos', modelID]);
    this.router.navigate(['/productos', modelID, this.markID]);
  }

  Back(){
    console.log("Regresar a la pagina de catalogo ", this.markID);
    this.router.navigate(['/catalogo']);
  }

}
