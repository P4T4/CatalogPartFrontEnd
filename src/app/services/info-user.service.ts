import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { IdentityUserView, InfoUserView } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InfoUserService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };
  public userCurrent: IdentityUserView;

  constructor(private http: HttpClient,
    private _config: ConfigurationService) {
    this.SerUrl = _config.GetUrlService() + '/InfoUser';
    this.userCurrent = _config.GetCurrentUser();

  }

  InfoUserByIdentityUser() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetInfoUserByIdentityUserID/' + this.userCurrent.identityUserId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  InfoUserByIdentityUserWithParamId(identityUserId: string) {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetInfoUserByIdentityUserID/' + identityUserId;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  CreateOrUpdateInfoUser(infoUser: InfoUserView) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/CreateOrUpdateInfoUser';
    const obs = this.http.post(url, infoUser, this.httpOptions);
    return obs;
  }

}
