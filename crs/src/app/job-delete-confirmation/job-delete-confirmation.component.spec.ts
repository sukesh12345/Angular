import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDeleteConfirmationComponent } from './job-delete-confirmation.component';

describe('JobDeleteConfirmationComponent', () => {
  let component: JobDeleteConfirmationComponent;
  let fixture: ComponentFixture<JobDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
