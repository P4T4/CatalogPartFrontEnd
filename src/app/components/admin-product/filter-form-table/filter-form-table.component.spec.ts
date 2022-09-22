import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFormTableComponent } from './filter-form-table.component';

describe('FilterFormTableComponent', () => {
  let component: FilterFormTableComponent;
  let fixture: ComponentFixture<FilterFormTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFormTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFormTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
