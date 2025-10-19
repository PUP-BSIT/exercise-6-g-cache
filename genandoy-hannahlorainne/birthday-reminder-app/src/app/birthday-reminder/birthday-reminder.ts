import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './birthday-reminder.html',
  styleUrls: ['./birthday-reminder.css']
})
export class BirthdayReminderComponent {
  birthdayForm: FormGroup;
  relations = ['Friend', 'Family', 'Classmate', 'Co-worker', 'Neighbor', 'Other'];
  birthdayList: BirthdayEntry[] = [];

  constructor(private fb: FormBuilder) {
    this.birthdayForm = this.fb.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      relation: ['', Validators.required],
      customRelation: [''],
      giftIdea: [''],
      notify: [false]
    });
  }

  addBirthday(): void {
    if (this.birthdayForm.valid) {
      const { name, birthDate, relation, customRelation, giftIdea, notify } = this.birthdayForm.value;
      const finalRelation = relation === 'Other' ? customRelation : relation;

      const newBirthday: BirthdayEntry = {
        name,
        birthDate,
        relation: finalRelation,
        giftIdea,
        notify
      };

      this.birthdayList.push(newBirthday);
      this.birthdayForm.reset();
    }
  }
}
