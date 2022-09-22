import { Component, OnInit } from '@angular/core';
import { ShopService, CartItem } from '../shop.service';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { ShoppingCarService } from 'app/services/shopping-car.service';
import { ProductInShoppingCarView } from 'app/models/shoppingCar';
import { Guid } from 'guid-typescript';
import { ProductoSelectView } from '../../../models/shoppingCar';
import Swal from 'sweetalert2';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [egretAnimations]
})
export class CartComponent implements OnInit {
  public cart: CartItem[];
  public total: number;
  public subTotal: number;
  public vat: number = 15;
  
  public productList: ProductInShoppingCarView[];
  public productListMain: ProductInShoppingCarView[];


  constructor(private shopService: ShopService,
              private _errorService: ErrorService,
              private _shoppingCarService: ShoppingCarService) {
                this.productList = [];

               }

  ngOnInit() {
    //this.getCart();
    //this.onQuantityChange();
    console.log('entro al carrito de compras');
    this.GetProductInShoppingCar();
  }

  ngOnDestroy() {
    var i = 0;
    for(let item of this.productList) {
        if (item.quantity !== item.quantityMain ) {
          Swal.fire({
            title: '¿Deseas guardar los cambios en tu carro de compras?',
            text: " ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(16, 23, 76)',
            cancelButtonColor: '#cdcdcd',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
             this.saveChange();
            } else if (result.dismiss === Swal.DismissReason.cancel){
            }
          })
          break;
        }
    }
  
 }

  GetProductInShoppingCar() {
    console.log('entro al servicio desde el component');
    this._shoppingCarService.ProductsInShoppingCar()
    .subscribe((response: ProductInShoppingCarView[]) => { 
       this.productList = response;
       this.productListMain = response;
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      console.log('servicio correcto');
      for(var item of this.productList) {
        item.quantityMain = item.quantity;
      }
      console.log('productos en el carrito', this.productList);
      this.getSubtotalCar();
    });
  }

  removeProductCar(productID: Guid, quantityView: number){
    console.log('remover producto del carrito de compras');
    var resultRemove: boolean;
    Swal.fire({
      title: '¿Quieres eliminar este elemento?',
      text: "El elemento se eliminara de tu carro de compras",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(16, 23, 76)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        var listProduct: Guid[] = [];
        listProduct.push(productID);
        this.removeProductService(listProduct);
      }
    })
  }

  onQuantityChangeProduct(productID: Guid, quantityView: number, unitPrice: number ) {
    var price = quantityView * unitPrice;
    //this.removeProductService(product);
    this.getSubtotalCar();
  }

  removeProductService(product: Guid[]) {
    console.log('productos a eliminar', product);
    this._shoppingCarService.RemoveProductShoppingCar(product)
    .subscribe((response) => {
    },
    error => {
      console.log('error', error);
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      console.log('servicio correcto');
      //this.GetProductInShoppingCar();
      location.reload();
    });
  }

  getSubtotalCar(){
    this.subTotal = 0;
    this.productList.forEach(item => {
      this.subTotal += (item.unitPrice * item.quantity)
    })
  }

  saveChange(){
    var listproduct: ProductoSelectView[] = [];
    this.productList.forEach(item => {
      var product: ProductoSelectView = {
        prodcutId: item.productId,
        quantity : item.quantity
      }
      listproduct.push(product);
    })
    //console.log('listaproduct', listproduct);
    this._shoppingCarService.AddProduct(listproduct)
    .subscribe((response) => { 
       
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      
      console.log('Se agrego al carrito');
      Swal.fire('Tus cambios en el carrito se han guardado', '' , "success");
      
    });
  }










  //////////////////PLANTILLA
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  removeProduct(cartItem) {
    this.shopService
    .removeFromCart(cartItem)
    .subscribe(res => {
      this.cart = res;
    })
  }
  onQuantityChange() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15/100))
  }

}
