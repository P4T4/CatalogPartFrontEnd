import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IdentityUserView, IUserCreateFromBack } from '../models/user';
import { ConfigurationService } from './configuration.service';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class IdentityUserService {

  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };
  public userCurrent: IdentityUserView;

  constructor(private http: HttpClient,
    private _config: ConfigurationService) {
    this.SerUrl = _config.GetUrlService() + '/IdentityUser';
    this.userCurrent = _config.GetCurrentUser();
  }

  CreateUser(entityUser: IdentityUserView) {
    console.log('Entró a crear usuario', entityUser);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var url = this.SerUrl + '/CreateIdentityUser';
    const obs = this.http.post<IdentityUserView>(url, entityUser, httpOptions)
    return obs;
  }

  CreateUserFromBack(entityUser: IUserCreateFromBack) {
    console.log('Entró a crear usuario from back', entityUser);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var url = this.SerUrl + '/CreateIdentityUserFromBack';
    const obs = this.http.post<IUserCreateFromBack>(url, entityUser, httpOptions)
    return obs;
  }

  IdentityUserAll() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetIdentityUserAll';
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  IdentityUserByEnterpriseId(enterpriseId: Guid) {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetIdentityUserByEnterpriseId/' + enterpriseId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  sendMail(userName: string, userEmail: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var url = this.SerUrl + '/SendMailEndRegistration/' + userName + '/' + userEmail;
    const obs = this.http.post(url, {}, httpOptions);
    return obs;
  }

  updateUser(IdentityUser: IdentityUserView) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/UpdateStateIdentityUser';
    const obs = this.http.put(url, IdentityUser, this.httpOptions);
    return obs
  }

  isFirtsChangePassword(IdentityUser: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    var url = this.SerUrl + '/GetActivePassByIdentityUserId/' + IdentityUser;
    const obs = this.http.get(url, httpOptions);
    return obs
  }

  getUserById(IdentityUser: any) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetIdentityUserById/' + IdentityUser;
    return this.http.get(url, this.httpOptions);
  }
}
