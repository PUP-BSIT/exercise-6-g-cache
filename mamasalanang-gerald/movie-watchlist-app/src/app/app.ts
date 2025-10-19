import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieForm, Movie } from './movie-form/movie-form';
import { MovieList } from './movie-list/movie-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieForm, MovieList],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('Movie Watchlist App');
  
  movies: Movie[] = [];

  onMovieAdded(movie: Movie) {
    this.movies.push(movie);
  }
}
