import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  zoom = 16;
  mapCenter = {
    lat: 4.577309,
    lng: -74.109128
  }  
  constructor() { }

  ngOnInit() { }   
}
