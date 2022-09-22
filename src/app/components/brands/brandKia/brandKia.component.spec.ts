import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandKiaComponent } from './brandKia.component';

describe('BrandKiaComponent', () => {
  let component: BrandKiaComponent;
  let fixture: ComponentFixture<BrandKiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandKiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandKiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
