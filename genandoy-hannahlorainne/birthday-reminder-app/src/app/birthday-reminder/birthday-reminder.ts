import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';

interface BirthdayEntry {
  name: string;
  birthDate: string;
  relation: string;
  giftIdea: string;
  notify: boolean;
}

@Component({
  selector: 'app-birthday-reminder',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './birthday-reminder.html',
  styleUrl: './birthday-reminder.css'
})
export class BirthdayReminderComponent {
  name = '';
  birthDate = '';
  relation = '';
  customRelation = ''; 
  giftIdea = '';
  notify = false;

  relations: string[] = ['Friend', 'Family', 'Classmate', 'Co-worker', 'Neighbor', 'Other'];

  birthdayList: BirthdayEntry[] = [];

  addBirthday() {
    let finalRelation = this.relation === 'Other' ? this.customRelation : this.relation;

    if (this.name && this.birthDate && finalRelation) {
      this.birthdayList.push({
        name: this.name,
        birthDate: this.birthDate,
        relation: finalRelation,
        giftIdea: this.giftIdea,
        notify: this.notify
      });

      this.name = '';
      this.birthDate = '';
      this.relation = '';
      this.customRelation = '';
      this.giftIdea = '';
      this.notify = false;
    }
  }
}
