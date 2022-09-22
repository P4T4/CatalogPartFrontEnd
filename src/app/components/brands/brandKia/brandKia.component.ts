import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ThemeService } from 'app/shared/services/theme.service';
import tinyColor from 'tinycolor2';

@Component({
  selector: 'app-kia',
  templateUrl: './brandKia.component.html',
  styleUrls: ['./brandKia.component.scss'],
  animations: egretAnimations
})
export class BrandKiaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      document.querySelector('#rightside-content-hold').scrollTo(0,0)
    });
  }
}
