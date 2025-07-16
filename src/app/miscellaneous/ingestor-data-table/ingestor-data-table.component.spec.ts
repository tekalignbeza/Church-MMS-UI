import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngestorDataTableComponent } from './ingestor-data-table.component';

describe('IngestorDataTableComponent', () => {
  let component: IngestorDataTableComponent;
  let fixture: ComponentFixture<IngestorDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngestorDataTableComponent]
    });
    fixture = TestBed.createComponent(IngestorDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
