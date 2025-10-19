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
  
  public movies: Movie[] = [];

  public onMovieAdded(movie: Movie): void {
    this.movies = [...this.movies, movie];
  }

  public onMovieToggled(updatedMovie: Movie): void {
    this.movies = this.movies.map(
      (movie: Movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
    );
  }

  public onMovieRemoved(movieToRemove: Movie): void {
    this.movies = this.movies.filter(
      (movie: Movie) => movie.id !== movieToRemove.id
    );
  }
}
