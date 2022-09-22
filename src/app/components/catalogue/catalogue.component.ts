import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouteTradeMark, TradeMarkView } from 'app/models/tradeMark';
import { TradeMarkService } from '../../services/trade-mark.service';
import { Guid } from 'guid-typescript';
import { ActivatedRoute, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import { ConfigurationService } from 'app/services/configuration.service';
import { IdentityUserView } from 'app/models/user';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  animations: [egretAnimations]
})
export class CatalogueComponent implements OnInit {
  public imgBase64List: string[];
  public tradeMarkList: TradeMarkView[];
  public content: boolean;
  public frame: boolean;
  public frameView: string;
  userView: IdentityUserView;

  constructor(private sanitizer: DomSanitizer,
    private _tradeMarkService: TradeMarkService,
    private loader: AppLoaderService,
    private activatedRoute: ActivatedRoute,
    private _configService: ConfigurationService,
    private router: Router,) {
    this.userView = _configService.GetCurrentUser();
    this.activatedRoute.params.subscribe(parametros => {
      var reload = parametros['reload'];
      if (reload) {
        if (!localStorage.getItem('reloadCatalogue')) {
          console.log('entro al reload');
          localStorage.setItem('reloadCatalogue', JSON.stringify(true));
          location.reload();
        }
      }
      this.content = false;
      this.frameView = null;
    });

  }

  ngOnInit() {
    //console.log('entro al catalogo');
    this.getTradeMarkAvaible();
  }

  convertBase64toUrl(urlImg: string) {
    //return url;
    return this.sanitizer.bypassSecurityTrustUrl(urlImg);
  }

  getTradeMarkAvaible() {
    this.loader.open();
    let route: string = this.userView?.identityUserId ? RouteTradeMark.RouteGetAll : RouteTradeMark.RouteGetAllActive;
    this._tradeMarkService.AllTradeMarkAvaible(route)
      .subscribe((response: TradeMarkView[]) => {
        this.tradeMarkList = response;
        //console.log('tradeMarkList', this.tradeMarkList);
      },
        error => {
          this.loader.close();
        },
        () => {
          this.loader.close();
          this.content = true;
        });
  }

  viewModel(markID: Guid, isExternal: boolean, codeFrame: string) {
    console.log('codeFrame', codeFrame);
    if (isExternal) {
      this.frame = true;
      this.frameView = codeFrame;
    } else {
      this.router.navigate(['/modelos', markID]);
    }
    //this.router.navigate(['/modelos', { markID: markID}]);

  }

  Back() {
    this.frame = false;
    this.frameView = null;
  }
}
