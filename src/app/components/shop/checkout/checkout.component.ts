import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryDB, CityDB } from '../../../shared/inmemory-db/countries';
import { ShopService, CartItem } from '../shop.service';
import { egretAnimations } from "../../../shared/animations/egret-animations";
import { ShoppingCarService } from '../../../services/shopping-car.service';
import { ProductInShoppingCarView, SelectPurchasedProductView } from 'app/models/shoppingCar';
import { InfoUserService } from '../../../services/info-user.service';
import { InfoUserView, TypeUser } from 'app/models/user';
import { ErrorService } from '../../../services/error.service';
import Swal from 'sweetalert2';
import { PurchaseProductService } from 'app/services/purchase-product.service';
import { MailService } from 'app/services/mail.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: egretAnimations
})
export class CheckoutComponent implements OnInit {
  public cart: CartItem[];
  public checkoutForm: FormGroup;
  public checkoutFormAlt: FormGroup;
  public hasAltAddress: boolean;
  public countries: any[];
  public cities: any[];

  public total: number;
  public subTotal: number;
  public vat: number = 19;
  public vatTotal: any;
  public shipping: any = 'Free';
  public paymentMethod: string;

  public productList: ProductInShoppingCarView[] = [];
  public infoUser: InfoUserView;

  constructor(
    private fb: FormBuilder,
    private shopService: ShopService,
    private _errorService: ErrorService,
    private _shoppingCarService: ShoppingCarService,
    private _infoUserService: InfoUserService,
    private _mailService: MailService,
    private _purchaseProductService: PurchaseProductService
  ) {

    let cityDB = new CityDB();
    this.cities = cityDB.cities;
  }

  ngOnInit() {
    // this.getCart();
    this.buildCheckoutForm();
    this.GetProductInShoppingCar();
    this.GetInformationUser();
  }

  GetProductInShoppingCar() {
    console.log('entro al servicio desde el component');
    this._shoppingCarService.ProductsInShoppingCar()
      .subscribe((response: ProductInShoppingCarView[]) => {
        this.productList = response;
      },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('servicio correcto');
          for (var item of this.productList) {
            item.quantityMain = item.quantity;
          }
          console.log('productList', this.productList);
          this.getSubtotalCar();
        });
  }

  GetInformationUser() {
    this._infoUserService.InfoUserByIdentityUser()
      .subscribe((response: InfoUserView) => {
        this.infoUser = response;
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          console.log('servicio correcto');
          console.log('infoUser', this.infoUser);
        });
  }

  getSubtotalCar() {
    this.subTotal = 0;
    this.vatTotal = 0;
    this.productList.forEach(item => {
      this.subTotal += (item.unitPrice * item.quantity)
      this.vatTotal += item.taxValueProduct;
    })
    this.total = this.subTotal + this.vatTotal;
  }

  saveChangeInfoUser() {
    this._infoUserService.CreateOrUpdateInfoUser(this.infoUser)
      .subscribe((response) => {
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          console.log('servicio correcto');
          Swal.fire('Información de Envio actualizada', '', 'success');
        });
  }

  placeOrder() {
    var listProductPurchase: SelectPurchasedProductView[] = [];
    this.productList.forEach(item => {
      var productPurchase: SelectPurchasedProductView = {
        productId: item.productId,
        quantity: item.quantity
      }
      listProductPurchase.push(productPurchase);
    })
    console.log('listProductPurchase', listProductPurchase);

    this._purchaseProductService.CreatePurchaseProduct(listProductPurchase)
      .subscribe((response) => {
      },
        error => {
          var message = this._errorService.HadlingError(error);
          this._errorService.SwalAlert(message.message, '', message.type);
        },
        () => {
          console.log('servicio correcto');
          this._mailService.sendMailAdmin(environment.nameAdmin, environment.mailAdmin).subscribe(() => {
            let purchase = TypeUser.ClientPerson == this._infoUserService.userCurrent.typeUser
              ? this._mailService.sendMailClient(this._infoUserService.userCurrent.name, this._infoUserService.userCurrent.email)
              : this._mailService.sendMailEnterprise(this._infoUserService.userCurrent.name, this._infoUserService.userCurrent.email);
            purchase.subscribe(() => {
              Swal.fire('Pedido realizado', 'Nos contactaremos contigo', 'success').then(() => {
                setTimeout(() => {
                  location.reload();
                }, 100);
              });
            }, error => {
              console.log(error)
              Swal.fire('Error en el sistema', 'Error al envíar el correo al cliente', 'error');
            })
          }, error => {
            console.log(error)
            Swal.fire('Error en el sistema', 'Error al envíar el correo al administrador', 'error');
          });
        });
  }








  /// Plantilla
  calculateCost() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.vatTotal = this.subTotal * (this.vat / 100);
    this.total = this.subTotal + this.vatTotal;
    if (this.shipping !== 'Free') {
      this.total += this.shipping;
    }
  }
  getCart() {
    this.shopService
      .getCart()
      .subscribe(cart => {
        this.cart = cart;
        this.calculateCost();
      })
  }
  buildCheckoutForm() {
    this.checkoutForm = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [],
      address1: ['', Validators.required],
      address2: [],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })

    this.checkoutFormAlt = this.fb.group({
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [],
      address1: ['', Validators.required],
      address2: [],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })
  }




}
