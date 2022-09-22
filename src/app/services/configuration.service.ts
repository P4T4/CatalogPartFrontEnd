import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IdentityUserView } from 'app/models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  serUrl: string = environment.url;
  UserCurrent: IdentityUserView;

  constructor() { }

  GetUrlService() {
    const Url = this.serUrl;
    return Url;
  }
  GetCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }
  GetCurrentUserMenuItem() {
    var user: any;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser != null ? user = currentUser: user = " ";
    return user;
  }

  GetHeaderAuthorization() {
    this.UserCurrent = this.GetCurrentUser();
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.UserCurrent.token}` }, 
      )
    }; 
    return httpOptions;
  }
}
