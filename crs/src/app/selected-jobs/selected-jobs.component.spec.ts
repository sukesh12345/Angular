import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedJobsComponent } from './selected-jobs.component';

describe('SelectedJobsComponent', () => {
  let component: SelectedJobsComponent;
  let fixture: ComponentFixture<SelectedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
