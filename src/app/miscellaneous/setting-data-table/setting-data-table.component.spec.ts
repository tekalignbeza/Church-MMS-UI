import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDataTableComponent } from './setting-data-table.component';

describe('SettingDataTableComponent', () => {
  let component: SettingDataTableComponent;
  let fixture: ComponentFixture<SettingDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingDataTableComponent]
    });
    fixture = TestBed.createComponent(SettingDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
