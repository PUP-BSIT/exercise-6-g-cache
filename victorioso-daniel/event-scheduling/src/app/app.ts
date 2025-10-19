import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventData, EventForm } from "./event-form/event-form";
import { EventList } from './event-list/event-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventForm, EventList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  events: EventData[] = [];

  addEvent(event: EventData) {
    this.events = [...this.events, event];
  }
}
