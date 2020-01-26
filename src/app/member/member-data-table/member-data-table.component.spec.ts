import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDataTableComponent } from './member-data-table.component';

describe('MemberDataTableComponent', () => {
  let component: MemberDataTableComponent;
  let fixture: ComponentFixture<MemberDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
