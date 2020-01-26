import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyDataTableComponent } from './family-data-table.component';

describe('FamilyDataTableComponent', () => {
  let component: FamilyDataTableComponent;
  let fixture: ComponentFixture<FamilyDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
