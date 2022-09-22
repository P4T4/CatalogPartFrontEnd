import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { ShoppingCarService } from '../../../services/shopping-car.service';
import { IdentityUserView, TypeUser } from '../../../models/user';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }, {
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }]
  currentLang = this.availableLangs[0];
  quantity: number;
  currentUser: IdentityUserView;
  viewCar: boolean;

  public get isAdmin() { return TypeUser.Admin == this.currentUser.typeUser; }

  public egretThemes;
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    private _shoppingCarService: ShoppingCarService,
    private _configService: ConfigurationService,
  ) {

  }
  ngOnInit() {
    //console.log('ngOnInit');

    this.getUserLogue();
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  getUserLogue() {
    this.currentUser = this._configService.GetCurrentUser();
    if (this.currentUser) {
      setTimeout(() => {
        //location.reload();
        this.getCuantityShoppingCar();
      }, 1000);

      this.viewCar = true;
    } else {
      this.viewCar = false;
    }
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, { transitionClass: true })

  }

  onSearch(e) {
    //   console.log(e)
  }

  getCuantityShoppingCar() {
    this._shoppingCarService.CountInShoppingCar()
      .subscribe((response: number) => {
        this.quantity = response;
      },
        error => {
          console.log('error', error);
          this.quantity = 0;
        },
        () => {

        });

  }
}