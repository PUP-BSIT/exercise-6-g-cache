import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

type BirthdayEntry = {
  name: string;
  birthDate: string;
  relation: string;
  giftIdea: string;
  notify: boolean;
};

@Component({
  selector: 'app-birthday-reminder',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './birthday-reminder.html',
  styleUrls: ['./birthday-reminder.scss']
})
export class BirthdayReminderComponent {
  private fb = inject(FormBuilder);
  birthdayForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    birthDate: ['', Validators.required],
    relation: ['', Validators.required],
    customRelation: [''],
    giftIdea: [''],
    notify: [false]
  });

  relations = ['Friend', 'Family', 'Classmate', 'Co-worker', 'Neighbor', 'Other'];
  birthdayList: BirthdayEntry[] = [];

  addBirthday(): void {
    if (this.birthdayForm.invalid) {
      this.birthdayForm.markAllAsTouched();
      return;
    }

    const { name, birthDate, relation, customRelation, giftIdea, notify } = this.birthdayForm.value;
    const finalRelation = relation === 'Other' ? customRelation : relation;

    const newEntry: BirthdayEntry = {
      name,
      birthDate,
      relation: finalRelation,
      giftIdea,
      notify
    };

    this.birthdayList = [...this.birthdayList, newEntry];

    this.birthdayForm.reset();
  }
}
