import { Component, Input } from '@angular/core';
import { EventData } from '../event-form/event-form';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [DatePipe],
  templateUrl: './event-list.html',
  styleUrl: './event-list.scss'
})
export class EventList {
  @Input() events: EventData[] = [];
}
