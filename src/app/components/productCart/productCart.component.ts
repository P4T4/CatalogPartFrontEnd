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
  templateUrl: './productCart.component.html',
  styleUrls: ['./productCart.component.css'],
  animations: egretAnimations
})
export class ProductCartComponent implements OnInit {
  public imgBase64List: string[];
  public productIdList: ProductIdView;
  public content: boolean;
  public productID: Guid;
  public modelID: Guid;
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
    this.activatedRoute.params.subscribe(parametros => {
      this.productID = parametros['productID'];
      this.modelID = parametros['modelID'];
    });
  }

  public get amountAvaluable() { return this.productIdList.quantity }

  ngOnInit() {
    this.getProductDetailId();
  }

  convertBase64toUrl(urlImg: string) {
    //return url;
    return this.sanitizer.bypassSecurityTrustUrl(urlImg);
  }

  getProductDetailId() {
    /* console.log('el id recibido es: ', this.productID); */
    this._productService.GetProductById(this.productID)
      .subscribe((response: ProductIdView) => {
        this.productIdList = response;
        console.log('GetProductById', this.productIdList);
      },
        error => {

        },
        () => {
          if (this.productIdList.imageBase64) {
            this.imagePath = false;
            this.filePreview = this.productIdList.imageBase64;
          }

          this.content = true;
        });
  }

  addToCart() {
    console.log("Función de agregar al carrito -> Ok ");
    if (this.quantity > 0) {
      this.AddProductShoppingCarService();
    } else {
      Swal.fire('Error', 'Debes agregar por lo menos un producto', 'error');
    }

  }

  AddProductShoppingCarService() {
    localStorage.removeItem('reloadCatalogue');
    var product: ProductoSelectView = {
      prodcutId: this.productID,
      quantity: this.quantity
    }
    var listproduct: ProductoSelectView[] = [];
    listproduct.push(product);
    this._shoppingService.AddProduct(listproduct)
      .subscribe((response) => {

      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {

          console.log('Se agrego al carrito');
          Swal.fire('Producto agregado', '', 'success').then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/catalogo', true]);
            }
          });
        });
  }

  return() {
    console.log("Regresar a la pagina de productos", this.modelID);
    this.router.navigate(['/productos', this.modelID, this.productID]);
  }


  /* viewModel(markID: Guid){
    console.log('entro a cargar los modelos', markID);
    this.router.navigate(['/modelos', markID]);
  } */
}
