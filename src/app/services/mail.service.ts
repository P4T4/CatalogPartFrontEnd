import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';

@Injectable({
    providedIn: 'root'
})
export class MailService {

    private url: string = '';
    private httpOptions: { headers: HttpHeaders };

    constructor(private http: HttpClient,
        private _config: ConfigurationService) {
        this.url = _config.GetUrlService() + '/Purchase';
    }

    sendMailAdmin(name: string, email: string) {
        this.httpOptions = this._config.GetHeaderAuthorization();
        var url = this.url + '/SendMailPurchaseAdmin/' + name + '/' + email;
        return this.http.post(url, {}, this.httpOptions)
    }

    sendMailClient(name: string, email: string) {
        this.httpOptions = this._config.GetHeaderAuthorization();
        var url = this.url + '/SendMailPurchaseClientPerson/' + name + '/' + email;
        return this.http.post(url, {}, this.httpOptions)
    }

    sendMailEnterprise(name: string, email: string) {
        this.httpOptions = this._config.GetHeaderAuthorization();
        var url = this.url + '/SendMailPurchaseClientEnterprise/' + name + '/' + email;
        return this.http.post(url, {}, this.httpOptions)
    }
}
