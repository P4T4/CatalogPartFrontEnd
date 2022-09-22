import { Component, OnInit, Input, Renderer2 } from "@angular/core";
/*
import { NavigationService } from "../../../shared/services/navigation.service";
import { LayoutService } from "../../../shared/services/layout.service";
import PerfectScrollbar from "perfect-scrollbar";
import { CustomizerService } from "app/shared/services/customizer.service";
import { ThemeService, ITheme } from "app/shared/services/theme.service";
*/
import { IdentityUserView, TypeUser } from '../../../models/user';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
  selector: "app-customizer",
  templateUrl: "./customizer.component.html",
  styleUrls: ["./customizer.component.scss"]
})
export class CustomizerComponent implements OnInit {

  public UserCurrent: IdentityUserView;
  viewCar: boolean;
  /*
  isCustomizerOpen: boolean = false;
  viewMode: 'options' | 'json' = 'options';
  sidenavTypes = [
    {
      name: "Default Menu",
      value: "default-menu"
    },
    {
      name: "Separator Menu",
      value: "separator-menu"
    },
    {
      name: "Icon Menu",
      value: "icon-menu"
    }
  ];
  sidebarColors: any[];
  topbarColors: any[];

  layoutConf;
  selectedMenu: string = "icon-menu";
  selectedLayout: string;
  isTopbarFixed = false;
  isFooterFixed = false;
  isRTL = false;
  egretThemes: ITheme[];
  perfectScrollbarEnabled: boolean = true;
  */

  public get isAdmin() { return TypeUser.Admin == this.UserCurrent.typeUser; }

  constructor(
    private _config: ConfigurationService,
    /*
    private navService: NavigationService,
    public layout: LayoutService,
    private themeService: ThemeService,
    public customizer: CustomizerService,
    private renderer: Renderer2
    */
  ) {

  }

  ngOnInit() {
    /*
    this.layoutConf = this.layout.layoutConf;
    this.selectedLayout = this.layoutConf.navigationPos;
    this.isTopbarFixed = this.layoutConf.topbarFixed;
    this.isRTL = this.layoutConf.dir === "rtl";
    this.egretThemes = this.themeService.egretThemes;
    */
    this.getUserLogue();
  }

  getUserLogue() {
    let tempUserCurrent = this._config.GetCurrentUser();
    this.UserCurrent = {
      ...tempUserCurrent,
      contactSellerLink: tempUserCurrent?.contacSellerLink
    }
    if (this.UserCurrent) {
      setTimeout(() => {
        //this.getCuantityShoppingCar();
      }, 1000);
      this.viewCar = true;
    } else {
      this.viewCar = false;
    }
  }

  linkWhatsApp() {
    console.log("entró a la función whatsApp", this.UserCurrent);
    window.open(this.UserCurrent?.contactSellerLink, '_blank');
  }

  /*
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
    this.layout.publishLayoutChange({matTheme: theme.name})
  }
  changeLayoutStyle(data) {
    this.layout.publishLayoutChange({ navigationPos: this.selectedLayout });
  }
  changeSidenav(data) {
    this.navService.publishNavigationChange(data.value);
  }
  toggleBreadcrumb(data) {
    this.layout.publishLayoutChange({ useBreadcrumb: data.checked });
  }
  toggleTopbarFixed(data) {
    this.layout.publishLayoutChange({ topbarFixed: data.checked });
  }
  toggleDir(data) {
    let dir = data.checked ? "rtl" : "ltr";
    this.layout.publishLayoutChange({ dir: dir });
  }
  tooglePerfectScrollbar(data) {
    this.layout.publishLayoutChange({perfectScrollbar: this.perfectScrollbarEnabled})
  }
  */
}
