import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDataDetailsComponent } from './setting-data-details.component';

describe('SettingDataDetailsComponent', () => {
  let component: SettingDataDetailsComponent;
  let fixture: ComponentFixture<SettingDataDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingDataDetailsComponent]
    });
    fixture = TestBed.createComponent(SettingDataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
