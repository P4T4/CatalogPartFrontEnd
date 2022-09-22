import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnterpriseView } from '../models/business';
import { ConfigurationService } from './configuration.service';
import { IdentityUserView } from '../models/user';
import { IEnterpriseEditInfo } from 'app/models/enterprises';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };
  public userCurrent: IdentityUserView;

  constructor(private http: HttpClient,
    private _config: ConfigurationService) {
    this.SerUrl = _config.GetUrlService() + '/Enterprise';
    this.userCurrent = _config.GetCurrentUser();
  }

  CreateEnterprise(enterprise: EnterpriseView) {
    console.log('Entró a crear empresa', enterprise);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var url = this.SerUrl + '/CreateEnterpriseWithUser';
    const obs = this.http.post<EnterpriseView>(url, enterprise, httpOptions)
    return obs;
  }

  EnterpriseById() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetEnterpriseById/' + this.userCurrent.enterpriseId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  EnterpriseById2(enterpriseId: string) {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetEnterpriseById/' + enterpriseId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  EnterpriseAll() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetEnterpriseAll';
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  updateEnterprise(objectToSend: IEnterpriseEditInfo) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/UpdateEnterprise';
    const obs = this.http.put(url, objectToSend, this.httpOptions);
    return obs;
  }

  sendMail(userName: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var url = this.SerUrl + '/SendMailEndRegistrationEnterprise/' + userName;
    const obs = this.http.post(url, {}, httpOptions);
    return obs;
  }
}
