import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { ProductIdView } from 'app/models/productCart';
import { ProductService } from 'app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

import { egretAnimations } from "../../shared/animations/egret-animations";
import { ShoppingCarService } from 'app/services/shopping-car.service';
import Swal from 'sweetalert2';
import { ProductoSelectView } from '../../models/shoppingCar';
import { ErrorService } from 'app/services/error.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './productCartByCatalogue.component.html',
  styleUrls: ['./productCartByCatalogue.component.css'],
  animations: egretAnimations
})
export class ProductCartByCatalogueComponent implements OnInit {
  public imgBase64List: string[];
  public productIdList: ProductIdView;
  public content: boolean;
  public marca: string;
  public codigo: string;
  public quantity: number = 1;
  public imagePath: boolean;
  public filePreview: string;

  constructor(private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private _errorService: ErrorService,
              private _productService: ProductService,
              private _shoppingService: ShoppingCarService,
              private router: Router,) { 
                this.content = false;
                this.imagePath = true;
                console.log('entro a buscar por codigo y marca');
                this.activatedRoute.params.subscribe(parametros => {
                  this.marca = parametros['marca'];
                  this.codigo = parametros['codigo'];
                }); 
              }

  ngOnInit() {
    this.getProductByCode();
  }

  convertBase64toUrl(urlImg: string) {
    //return url;
    return this.sanitizer.bypassSecurityTrustUrl(urlImg);
  }

  getProductByCode() {
    /* console.log('el id recibido es: ', this.productID); */
    this._productService.GetProductByCode(this.marca, this.codigo)
    .subscribe((response: ProductIdView) => { 
       this.productIdList = response;
       console.log('GetProductByCode', this.productIdList);
    },
    error => {
      
    },
    ()=> {
      if(this.productIdList.imageBase64) {
        this.imagePath = false;
        this.filePreview = this.productIdList.imageBase64;
      }
      
      this.content = true;
    });
  }

  addToCart(productID: Guid) {
    console.log("Función de agregar al carrito -> Ok ");
    if(this.quantity > 0) {
      var product: ProductoSelectView = {
        prodcutId: productID,
        quantity : this.quantity
      }
      this.AddProductShoppingCarService(product);
    } else {
      Swal.fire('Error', 'Debes agregar por lo menos un producto' , 'error');
    }
  
  }

  AddProductShoppingCarService(product: ProductoSelectView) {
    var listproduct: ProductoSelectView[] = [];
    listproduct.push(product);
    this._shoppingService.AddProduct(listproduct)
    .subscribe((response) => { 
       
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      
      console.log('Se agrego al carrito');
      Swal.fire('Producto agregado', '' , "success");
      setTimeout(() => {
        location.reload();
      }, 150);
    });
  }

  return(){
    console.log("Regresar a la pagina de productos", this.productIdList.referenceTradeMarkId);
    this.router.navigate(['/productos', this.productIdList.referenceTradeMarkId, this.productIdList.tradeMarkId]);
  }


  /* viewModel(markID: Guid){
    console.log('entro a cargar los modelos', markID);
    this.router.navigate(['/modelos', markID]);
  } */
}
