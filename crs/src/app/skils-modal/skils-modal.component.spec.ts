import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkilsModalComponent } from './skils-modal.component';

describe('SkilsModalComponent', () => {
  let component: SkilsModalComponent;
  let fixture: ComponentFixture<SkilsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkilsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkilsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
