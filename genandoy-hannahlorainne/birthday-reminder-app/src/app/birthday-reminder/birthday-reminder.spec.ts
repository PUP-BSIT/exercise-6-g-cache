import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayReminder } from './birthday-reminder';

describe('BirthdayReminder', () => {
  let component: BirthdayReminder;
  let fixture: ComponentFixture<BirthdayReminder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthdayReminder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayReminder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
