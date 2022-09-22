import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Inventory } from 'app/models/inventory';
import { LoadProductView } from 'app/models/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private SerUrl: string = '';
  private httpOptions: { headers: HttpHeaders };
  inventory: Inventory;

  constructor(
    private http: HttpClient,
    private _config: ConfigurationService
  ) {
    this.SerUrl = _config.GetUrlService() + '/Product';
    // this.inventory = _config.GetCurrentUser();
  }

  uploadInventory(products: LoadProductView[]) {
    console.log('products', products);
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url = this.SerUrl + '/LoadProduct';
    return this.http.post(url, products, this.httpOptions);
  }

}

