import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { LoginService } from '../../../services/login.service';
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { IdentityUserView } from '../../../models/user';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  public UserCurrent: IdentityUserView;
  viewCar: boolean;

  constructor(
    private _config: ConfigurationService,
    private _loginService: LoginService,
    private router: Router,
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    public jwtAuth: JwtAuthService
  ) { }

  ngOnInit() {
    this.getUserLogue();
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });
    this.layoutConf = this.layout.layoutConf;
  }

  getUserLogue() {
    this.UserCurrent = this._config.GetCurrentUser();
    if (this.UserCurrent) {
      setTimeout(() => {
        //location.reload();
        //this.getCuantityShoppingCar();
      }, 1000);
      this.viewCar = true;
    } else {
      this.viewCar = false;
    }
  }

  ngAfterViewInit() { }
  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }
  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
      this.layout.publishLayoutChange({
        // sidebarStyle: "compact",
        sidebarCompactToggle: true
      });
    }
  }

  logOut() {
    //console.log('Cerrar sesión');
    this._loginService.Logout();

    this.router.navigate(['/auth/login']);
  }
}
