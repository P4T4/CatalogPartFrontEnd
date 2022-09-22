import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSuzukiComponent } from './brandSuzuki.component';

describe('BrandSuzukiComponent', () => {
  let component: BrandSuzukiComponent;
  let fixture: ComponentFixture<BrandSuzukiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandSuzukiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandSuzukiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
