import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';

export const DIT: string[] = ['DIT 1', 'DIT 2', 'DIT 3'];
export const BSIT: string[] = ['BSIT 1', 'BSIT 2', 'BSIT 3', 'BSIT 4'];
export const BSITL: string[] = ['BSIT L1', 'BSIT L2'];
export const ALL_ATTENDEES: string[] = [...DIT, ...BSIT, ...BSITL];

export enum Venue {
  Aquarium = 'Aquarium',
  BldgAQuadrangle = 'Bldg A Quadrangle',
  Conference = 'Conference',
  EngrBldgAVR = 'Engr Bldg AVR'
}

export interface EventData {
  eventName: string;
  eventDate: Date;
  eventVenue: Venue;
  eventStartTime: string;
  requiredAttendee: string[];
}

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './event-form.html',
  styleUrls: ['./event-form.scss']
})
export class EventForm {
  @Output() eventCreated = new EventEmitter<EventData>();

  private formBuilder = inject(FormBuilder);

  venues = signal(Object.values(Venue));
  dit = signal(DIT);
  bsit = signal(BSIT);
  bsitl = signal(BSITL);

  ALL_ATTENDEES = [...DIT, ...BSIT, ...BSITL];

  eventForm = this.formBuilder.group({
    eventName: ['', {
      validators: [Validators.required]
    }],
    eventDate: ['', {
      validators: [Validators.required]
    }],
    eventVenue: ['', {
      validators: [Validators.required]
    }],
    eventStartTime: ['', {
      validators: [Validators.required]
    }],
    requiredAttendee: this.formBuilder.array(
      this.ALL_ATTENDEES.map(() => this.formBuilder.control(false, {
        validators: [Validators.required]
      }))
    )
  });

  get requiredAttendeeArray() {
    return this.eventForm.get('requiredAttendee') as FormArray;
  }

onSubmit() {
  if (this.eventForm.valid) {
    const formValue = this.eventForm.value;
    const selectedAttendees = this.ALL_ATTENDEES.filter(
      (_, i) => formValue.requiredAttendee?.[i]
    );
    const [year, month, day] = (formValue.eventDate ?? '').split('-').map(Number);
    const [hour, minute] = (formValue.eventStartTime ?? '00:00')
        .split(':').map(Number);
    
    const eventDateTime = new Date(year, month - 1, day, hour, minute);

    this.eventCreated.emit({
      eventName: formValue.eventName ?? '',
      eventDate: eventDateTime,
      eventVenue: formValue.eventVenue as Venue,
      eventStartTime: formValue.eventStartTime ?? '',
      requiredAttendee: selectedAttendees
    });

    this.eventForm.reset({
      eventName: '',
      eventDate: '',
      eventVenue: '',
      eventStartTime: '',
      requiredAttendee: this.ALL_ATTENDEES.map(() => false)
    });
  }
}
}