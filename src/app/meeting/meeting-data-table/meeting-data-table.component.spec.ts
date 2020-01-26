import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDataTableComponent } from './meeting-data-table.component';

describe('MeetingDataTableComponent', () => {
  let component: MeetingDataTableComponent;
  let fixture: ComponentFixture<MeetingDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
