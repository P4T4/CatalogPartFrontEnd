import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  zoom = 16;
  mapCenter = {
    lat: 4.577309,
    lng: -74.109128
  }  
  constructor() { }

  ngOnInit() { }   
}
