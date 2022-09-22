import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PurchaseService } from '../../services/purchase.service';
import { IPurchasedProductResponseView, PurchasedProductView, PurchaseView, TransactionStateType } from '../../models/purchase';
import { ErrorService } from '../../services/error.service';
import { ConfigurationService } from '../../services/configuration.service';
import { IdentityUserView, TypeUser } from '../../models/user';
import { PurchaseProductService } from '../../services/purchase-product.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public productList = [
    {
      productName: "Producto nombre",
      quantity: 3,
      unitPrice: 200000
    },
    {
      productName: "Tornillo",
      quantity: 2,
      unitPrice: 500000
    },
    {
      productName: "Carro",
      quantity: 1,
      unitPrice: 900000
    }
  ]
  public numberOrder: string = '';
  public nameUser: string = '';
  public listPurchase: PurchaseView[];
  public temporalListPurchase: PurchaseView[];
  public userView: IdentityUserView;
  constructor(private _configService: ConfigurationService,
    private loader: AppLoaderService,
    private _purchaseService: PurchaseService,
    private _purchaseProductService: PurchaseProductService,
    private _errorService: ErrorService) {
    this.userView = _configService.GetCurrentUser();
  }

  public get enableUserField() { return this.userView.typeUser == TypeUser.Admin || this.userView.typeUser == TypeUser.ClientAdminEnterprise; }

  ngOnInit() {
    this.GetPurchaseByRol();
  }

  GetPurchaseByRol() {
    switch (this.userView.typeUser) {
      case TypeUser.ClientPerson:
        this.GetPurchaseByIdentityUserId();
        break;
      case TypeUser.ClientAdminEnterprise:
        this.GetPurchaseByEnterpriseId();
        break;
      case TypeUser.ClientUserEnterprise:
        this.GetPurchaseByIdentityUserId();
        break;
    }

  }

  GetPurchaseByEnterpriseId() {
    this.loader.open();
    this._purchaseService.PurchaseByEnterpriseId()
      .subscribe((response: PurchaseView[]) => {
        this.listPurchase = response;
        this.temporalListPurchase = response;
        console.log('GetPurchaseByEmpresa', this.listPurchase);
      },
        error => {
          this.loader.close();
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          this.GetProductPurchase();
          this.loader.close();
        });
  }

  public filterList() {
    this.listPurchase = this.temporalListPurchase
      .filter((item: PurchaseView) =>
        item.numberOrder.indexOf(this.numberOrder) >= 0
      )
  }

  GetPurchaseByIdentityUserId() {
    this.loader.open();
    this._purchaseService.PurchaseByIdentityUserId()
      .subscribe((response: PurchaseView[]) => {
        this.listPurchase = response;
        this.temporalListPurchase = response;
        console.log('GetPurchaseById', this.listPurchase);
      },
        error => {
          this.loader.close();
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          this.GetProductPurchase();
          this.loader.close();
        });
  }

  GetProductPurchase() {
    for (let purchase of this.listPurchase) {
      var index = this.listPurchase.indexOf(purchase);
      this.SetTransactionStateType(purchase, index);
      this.GetPurchaseProductByPurchaseID(purchase, index);
    }
  }

  GetPurchaseProductByPurchaseID(purchaseView: PurchaseView, purchaseIndex: number) {
    this._purchaseProductService.PurchaseProductByPurchaseID(purchaseView.purchaseId)
      .subscribe((response: PurchasedProductView[]) => {
        this.listPurchase[purchaseIndex].purchaseProductList = response;
        console.log('GetPurchaseProductById', this.listPurchase[purchaseIndex].purchaseProductList);
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
        });
  }

  SetTransactionStateType(purchaseView: PurchaseView, purchaseIndex: number) {
    var purchaseState: string;
    switch (purchaseView.transactionState) {
      case TransactionStateType.Created:
        purchaseState = "Creado";
        break;
      case TransactionStateType.Approved:
        purchaseState = "Aprobado";
        break;
      case TransactionStateType.Dispatched:
        purchaseState = "Despachado";
        break;
      case TransactionStateType.Delivered:
        purchaseState = "Entregado";
        break;
      case TransactionStateType.Cancelled:
        purchaseState = "Cancelado";
        break;
    }
    this.listPurchase[purchaseIndex].transactionStateLabel = purchaseState;
  }

  public getFullName(product: any) {
    return product.codeReference + ' - ' + product.tradeMarkName + ' - ' + product.referenceName + ' - ' + product.description;
  }

}
