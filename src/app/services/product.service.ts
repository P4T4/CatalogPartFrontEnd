import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Guid } from 'guid-typescript';
import { ProductView } from 'app/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient,
    private _config: ConfigurationService) {
    this.SerUrl = _config.GetUrlService() + '/Product';

  }

  GetProductId(ModelID: Guid) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetProductByModelId/' + ModelID;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  //Obtener el detalle del producto por el id del producto
  GetProductById(ProductID: Guid) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetProductById/' + ProductID;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  //Obtener el detalle del producto por la marca y codigo de referencia
  GetProductByCode(Mark: string, Code: string) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetProductByCode/' + Mark + '/' + Code;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  getProductByMarkAndReference(mark: string, reference: string) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetProductByMarkAndReference';
    return this.http.post(url, { tradeMarkId: mark, referenceTradeMarkId: reference }, this.httpOptions);
  }

  AllProductsAvalibles() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    const obs = this.http.get(this.SerUrl, this.httpOptions);
    return obs;
  }

  saveProduct(body: ProductView): Observable<ProductView> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.post<ProductView>(this._config.GetUrlService() + '/Product/CreateProduct', body, this.httpOptions);
  }

  updateProduct(body: ProductView): Observable<ProductView> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.put<ProductView>(this._config.GetUrlService() + '/Product/UpdateProduct', body, this.httpOptions);
  }

}
