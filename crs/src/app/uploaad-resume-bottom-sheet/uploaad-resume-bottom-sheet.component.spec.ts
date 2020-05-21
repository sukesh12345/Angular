import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaadResumeBottomSheetComponent } from './uploaad-resume-bottom-sheet.component';

describe('UploaadResumeBottomSheetComponent', () => {
  let component: UploaadResumeBottomSheetComponent;
  let fixture: ComponentFixture<UploaadResumeBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaadResumeBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaadResumeBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
