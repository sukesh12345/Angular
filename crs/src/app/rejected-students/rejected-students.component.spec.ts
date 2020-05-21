import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedStudentsComponent } from './rejected-students.component';

describe('RejectedStudentsComponent', () => {
  let component: RejectedStudentsComponent;
  let fixture: ComponentFixture<RejectedStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
