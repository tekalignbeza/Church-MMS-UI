import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailNewComponent } from './member-detail-new.component';

describe('MemberDetailNewComponent', () => {
  let component: MemberDetailNewComponent;
  let fixture: ComponentFixture<MemberDetailNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailNewComponent]
    });
    fixture = TestBed.createComponent(MemberDetailNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
