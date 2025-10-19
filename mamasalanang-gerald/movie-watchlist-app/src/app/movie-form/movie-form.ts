import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  watched: boolean;
}

@Component({
  selector: 'app-movie-form',
  imports: [FormsModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.sass'
})
export class MovieForm {
  @Output() movieAdded = new EventEmitter<Movie>();

  movie: Movie = {
    id: 0,
    title: '',
    director: '',
    year: new Date().getFullYear(),
    genre: '',
    watched: false
  };

  formSubmitted = false;

  genres = [
    'Action',
    'Comedy',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Adventure',
    'Animation',
    'Documentary'
  ];

  addMovie() {
    this.formSubmitted = true;
    
    // Check if form is valid and genre is selected (not "none")
    if (this.isFormValid()) {
      this.movie.id = Date.now(); // Simple ID generation
      this.movieAdded.emit({ ...this.movie });
      this.resetForm();
    } else {
      // Form is invalid, validation errors will show
      console.log('Form validation failed - showing errors');
    }
  }

  isFormValid(): boolean {
    return !!(
      this.movie.title?.trim() && 
      this.movie.director?.trim() && 
      this.movie.genre && 
      this.movie.genre.trim() &&
      this.movie.year &&
      this.movie.year >= 1900 &&
      this.movie.year <= 2030
    );
  }

  hasError(fieldName: keyof typeof this.movie): boolean {
    if (!this.formSubmitted) return false;
    
    switch (fieldName) {
      case 'title':
        return !this.movie.title.trim();
      case 'director':
        return !this.movie.director.trim();
      case 'year':
        return !this.movie.year || this.movie.year < 1900 || this.movie.year > 2030;
      case 'genre':
        return !this.movie.genre || this.movie.genre === '';
      default:
        return false;
    }
  }

  resetForm() {
    this.movie = {
      id: 0,
      title: '',
      director: '',
      year: new Date().getFullYear(),
      genre: '',
      watched: false
    };
    this.formSubmitted = false;
  }
}
