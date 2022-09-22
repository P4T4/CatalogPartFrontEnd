import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { ReferenceTradeMarkView } from 'app/models/tradeMark';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferenceTradeMarkService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };

  constructor(
    private http: HttpClient,
    private _config: ConfigurationService
  ) {
    this.SerUrl = _config.GetUrlService() + '/ReferenceTradeMark';

  }


  ModelTradeMarkByMarkId(MarkID: Guid) {
    console.log('obtener el modelo');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/GetModelTradeMarkByMarkId/' + MarkID;
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  AllReferenceTradeMarkAvaible() {
    //console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    const obs = this.http.get(this.SerUrl + '/GetModelTradeMarkAll', this.httpOptions);
    return obs;
  }

  saveReferenceTradeMark(body: ReferenceTradeMarkView): Observable<ReferenceTradeMarkView> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.post<ReferenceTradeMarkView>(this._config.GetUrlService() + '/ReferenceTradeMark/CreateReferenceTradeMark', body, this.httpOptions);
  }

  updateReferenceTradeMark(body: ReferenceTradeMarkView): Observable<ReferenceTradeMarkView> {
    this.httpOptions = this._config.GetHeaderAuthorization();
    return this.http.put<ReferenceTradeMarkView>(this._config.GetUrlService() + '/ReferenceTradeMark/UpdateReferenceTradeMark', body, this.httpOptions);
  }
}
