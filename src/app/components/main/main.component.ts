import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as hopscotch from 'hopscotch';
import { egretAnimations } from "app/shared/animations/egret-animations";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: egretAnimations
})
export class MainComponent implements OnInit, OnDestroy {
  zoom = 16;
  mapCenter = {
    lat: 4.583504125488425,
    lng: -74.10938588695463
  }
  constructor(public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.params.subscribe(parametros => {
      let reload = parametros['loading'];
      if (reload) {
        if (!localStorage.getItem('reload')) {
          console.log('entro al reload');
          localStorage.setItem('reload', JSON.stringify(true));
          location.reload();
        }
      }
    });

  }

  ngOnInit() { }
  ngOnDestroy() {
    hopscotch.endTour(true);
  }


}
