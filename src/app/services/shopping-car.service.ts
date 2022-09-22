import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { IdentityUserView } from 'app/models/user';
import { ProductoSelectView } from 'app/models/shoppingCar';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarService {
  private SerUrl: string = '';
  private httpOptions: {headers: HttpHeaders};
  userCurrent: IdentityUserView;

  constructor(private http: HttpClient,
              private _config: ConfigurationService) { 
                this.SerUrl = _config.GetUrlService() + '/ShoppingCar';
                this.userCurrent = _config.GetCurrentUser();
              }

  //Agrega un nuevo producto al carrito de compras con para el usuario logueado
  //Retorna OK
  AddProduct(product: ProductoSelectView[]) {
    console.log('llego al servicio', product);
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/AddProduct?identityUserId=' + this.userCurrent.identityUserId; 
    console.log('urladd',url);
    console.log('bodyadd',product);
    const obs = this.http.post(url, product, this.httpOptions);
    return obs;
  }
  
  //Obtiene todos los productos del carrito para el usuario logueado
  //Retorna una lista de ProductInShoppingCarView
  ProductsInShoppingCar() {
    console.log('entro al servicio service');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetProductInShoppingCar/' + this.userCurrent.identityUserId; 
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  //Obtiene la cantidad de productos del carrito de compras
  //Retorna número entero
  CountInShoppingCar() {
    this.userCurrent = this._config.GetCurrentUser();
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetCountInShoppingCar/' + this.userCurrent.identityUserId; 
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  //Eliminar un producto del carrito de compras
  //Retorna OK
  RemoveProductShoppingCar(listProduct: Guid[]) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/RemoveProduct?identityUserId=' + this.userCurrent.identityUserId; 
    const obs = this.http.post(url, listProduct, this.httpOptions);
    return obs;
  }
}
