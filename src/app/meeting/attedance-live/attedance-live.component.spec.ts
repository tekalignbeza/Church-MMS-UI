import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttedanceLiveComponent } from './attedance-live.component';

describe('AttedanceLiveComponent', () => {
  let component: AttedanceLiveComponent;
  let fixture: ComponentFixture<AttedanceLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttedanceLiveComponent]
    });
    fixture = TestBed.createComponent(AttedanceLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
