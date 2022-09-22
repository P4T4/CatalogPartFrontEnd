import { Component, OnInit, Input, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, OnDestroy, ComponentRef } from "@angular/core";
// import { EXAMPLE_COMPONENTS } from "assets/examples/examples";

@Component({ 
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() type: string;
  @Input() dismiss: string;

  constructor() { }

  ngOnInit() {
  }

  public dismissAlert(element) {
    element.remove();
  }

}
