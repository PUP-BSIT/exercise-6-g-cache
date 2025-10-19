import { Component } from '@angular/core';
import { BirthdayReminderComponent } from './birthday-reminder/birthday-reminder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BirthdayReminderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}
