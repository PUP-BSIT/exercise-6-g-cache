import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  genres: string[] = Object.values(Genre);

  addMovie(): void {
    this.formSubmitted = true;
    
    if (this.isFormValid()) {
      this.movie.id = Date.now();
      this.movieAdded.emit({ ...this.movie });
      this.resetForm();
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

  hasError(fieldName: keyof Movie): boolean {
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

  resetForm(): void {
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
