import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConditionsAndTerms } from 'app/models/tyc';
import { Observable } from 'rxjs';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class TycService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };

  constructor(
    private http: HttpClient,
    private _config: ConfigurationService
  ) {
    this.SerUrl = _config.GetUrlService() + '/TermsAndCondition/GetTermsAndConditionActive';
  }

  getConditionsAndTerms(): Observable<IConditionsAndTerms> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<IConditionsAndTerms>(this.SerUrl, httpOptions);
  }
}
