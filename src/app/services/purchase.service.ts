import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { IdentityUserView, InfoUserView } from '../models/user';
import { IPurchaseRequestView, IPurchaseResponseView } from 'app/models/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };
  public userCurrent: IdentityUserView;

  constructor(private http: HttpClient,
    private _config: ConfigurationService) {
    this.SerUrl = _config.GetUrlService() + '/Purchase';
    this.userCurrent = _config.GetCurrentUser();
  }

  PurchaseByEnterpriseId() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetPurchaseByEnterpriseId/' + this.userCurrent.enterpriseId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  PurchaseByIdentityUserId() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetPurchaseByIdentityUserId/' + this.userCurrent.identityUserId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  getListByTypeUser(payload: IPurchaseRequestView): Observable<IPurchaseResponseView[]> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.post<IPurchaseResponseView[]>(`${this.SerUrl}/GetPurchase`, payload, this.httpOptions);
  }

}

