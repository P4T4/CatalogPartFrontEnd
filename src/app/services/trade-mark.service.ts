import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Guid } from 'guid-typescript';
import { RouteTradeMark, TradeMarkView } from 'app/models/tradeMark';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeMarkService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };

  constructor(
    private http: HttpClient,
    private _config: ConfigurationService
  ) {
    this.SerUrl = _config.GetUrlService() + '/TradeMark';
  }

  AllTradeMarkAvaible(route: string) {
    //console.log('ntro al servicio');
    this.httpOptions = RouteTradeMark.RouteGetAllActive == route ? this.httpOptions : this._config.GetHeaderAuthorization();
    const obs = this.http.get(this.SerUrl + route, this.httpOptions);
    return obs;
  }

  saveTradeMark(body: TradeMarkView): Observable<TradeMarkView> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.post<TradeMarkView>(this._config.GetUrlService() + '/TradeMark/CreateTradeMark', body, this.httpOptions);
  }

  updateTradeMark(body: TradeMarkView): Observable<TradeMarkView> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.put<TradeMarkView>(this._config.GetUrlService() + '/TradeMark/UpdateTradeMark', body, this.httpOptions);
  }

}
