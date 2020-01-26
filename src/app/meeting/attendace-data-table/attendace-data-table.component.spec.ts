import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendaceDataTableComponent } from './attendace-data-table.component';

describe('AttendaceDataTableComponent', () => {
  let component: AttendaceDataTableComponent;
  let fixture: ComponentFixture<AttendaceDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendaceDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendaceDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
