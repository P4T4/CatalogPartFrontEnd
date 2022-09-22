import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandHyundaiComponent } from './brandHyundai.component';

describe('BrandHyundaiComponent', () => {
  let component: BrandHyundaiComponent;
  let fixture: ComponentFixture<BrandHyundaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandHyundaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandHyundaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
