import { Component, EventEmitter, Output } from '@angular/core';
import {
  CommonModule,
  NgForOf,
  NgIf,
  NgClass
} from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';

export type Movie = {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  watched: boolean;
};

export enum Genre {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  SCI_FI = 'Sci-Fi',
  THRILLER = 'Thriller',
  ADVENTURE = 'Adventure',
  ANIMATION = 'Animation',
  DOCUMENTARY = 'Documentary'
}

@Component({
  selector: 'app-movie-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.sass'
})
export class MovieForm {
  @Output() movieAdded = new EventEmitter<Movie>();

  public movieForm: FormGroup;
  public formSubmitted = false;
  public genres: string[] = Object.values(Genre);

  constructor(private formBuilder: FormBuilder) {
    this.movieForm = this.formBuilder.group({
      title: ['', [Validators.required, this.titleValidator]],
      director: ['', [Validators.required, this.directorValidator]],
      year: [
        new Date().getFullYear(), 
        [Validators.required, this.yearValidator]
      ],
      genre: ['', [Validators.required, this.genreValidator]],
      watched: [false]
    });
  }

  private titleValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value || !value.trim()) {
      return { 'required': 'Title is required' };
    }
    return null;
  }

  private directorValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value || !value.trim()) {
      return { 'required': 'Director is required' };
    }
    return null;
  }

  private yearValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value || value < 1900 || value > 2030) {
      return { 'invalidYear': 'Year must be between 1900 and 2030' };
    }
    return null;
  }

  private genreValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value || value === '') {
      return { 'required': 'Genre is required' };
    }
    return null;
  }

  public addMovie(): void {
    this.formSubmitted = true;
    if (this.movieForm.invalid) {
      this.movieForm.markAllAsTouched();
    }

    if (this.movieForm.valid) {
      const movie: Movie = {
        id: Date.now(),
        title: this.movieForm.value.title,
        director: this.movieForm.value.director,
        year: this.movieForm.value.year,
        genre: this.movieForm.value.genre,
        watched: this.movieForm.value.watched
      };
      
      this.movieAdded.emit(movie);
      this.resetForm();
    }
  }

  public hasError(fieldName: string): boolean {
    const control = this.movieForm.get(fieldName);
    if (!control) return false;
    return !!(control.invalid && (control.touched || this.formSubmitted));
  }

  public getErrorMessage(fieldName: string): string {
    const control = this.movieForm.get(fieldName);
    if (control && control.errors) {
      const errors = control.errors;
      if (errors['required']) return `${fieldName} is required`;
      if (errors['invalidYear']) {
        return 'Year must be between 1900 and 2030';
      }
    }
    return '';
  }

  private resetForm(): void {
    this.movieForm.reset({
      title: '',
      director: '',
      year: new Date().getFullYear(),
      genre: '',
      watched: false
    });
    this.formSubmitted = false;
  }

  public trackByGenre(_index: number, genre: string): string {
    return genre;
  }
}
