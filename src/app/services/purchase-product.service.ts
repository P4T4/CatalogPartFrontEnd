import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Guid } from 'guid-typescript';
import { SelectPurchasedProductView } from 'app/models/shoppingCar';
import { IdentityUserView } from '../models/user';
import { Observable } from 'rxjs';
import { IChangeStatePurchaseProduct, IPurchasedProductResponseView } from 'app/models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseProductService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };
  public Usercurrent: IdentityUserView;

  constructor(private http: HttpClient,
    private _config: ConfigurationService) {
    this.SerUrl = _config.GetUrlService() + '/PurchaseProduct';
    this.Usercurrent = _config.GetCurrentUser();
  }
  //Servicio para hacer checkout del carrito de compras
  CreatePurchaseProduct(listProduct: SelectPurchasedProductView[]) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/CreatePurchaseProduct?identityUserId=' + this.Usercurrent.identityUserId;
    const obs = this.http.post(url, listProduct, this.httpOptions);
    return obs;
  }

  PurchaseProductByPurchaseID(purchaseId: Guid) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetPurchaseProductByPurchaseID/' + purchaseId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  getListByPurchaseId(idPurchase: Guid): Observable<IPurchasedProductResponseView[]> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.get<IPurchasedProductResponseView[]>(`${this.SerUrl}/GetPurchaseProductByPurchaseID/${idPurchase}`, this.httpOptions);
  }

  changeStatePurchase(payload: IChangeStatePurchaseProduct) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.post<any[]>(`${this.SerUrl}/purchasedProductChangeState`, payload, this.httpOptions);
  }

}
