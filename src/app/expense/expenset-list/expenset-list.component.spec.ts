import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensetListComponent } from './expenset-list.component';

describe('ExpensetListComponent', () => {
  let component: ExpensetListComponent;
  let fixture: ComponentFixture<ExpensetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
