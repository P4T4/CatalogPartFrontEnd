import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequestView, IdentityUserView, IChangePassUser } from '../models/user';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };

  constructor(
    private http: HttpClient,
    private _config: ConfigurationService
  ) {
    this.SerUrl = _config.GetUrlService() + '/Login';
  }

  Login(loginView: LoginRequestView): Observable<IdentityUserView> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const obs = this.http.post<IdentityUserView>(this.SerUrl, loginView, httpOptions)
      .pipe(tap((user) => localStorage.setItem('currentUser', JSON.stringify(user))));
    return obs;
  }

  Logout() {
    /* console.log('Servicio de cerrar sesión');*/
    this.httpOptions = this._config.GetHeaderAuthorization();
    const obs = this.http.get(this.SerUrl, this.httpOptions);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('reload');
    localStorage.removeItem('reloadCatalogue');
    return obs;
  }

  ChangePassword(changePassword: IChangePassUser) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this._config.GetUrlService() + '/IdentityUser/UpdatePassIdentityUser', changePassword, httpOptions);
  }

  ChangeInitialPassword(changePassword: IdentityUserView) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this._config.GetUrlService() + '/IdentityUser/InitialUpdatePassIdentityUser', changePassword, httpOptions);
  }
}
