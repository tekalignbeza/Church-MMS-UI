import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDataTableComponent } from './vendor-data-table.component';

describe('VendorDataTableComponent', () => {
  let component: VendorDataTableComponent;
  let fixture: ComponentFixture<VendorDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
