import { Component, Input } from '@angular/core';
import { Movie } from '../movie-form/movie-form';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.sass'
})
export class MovieList {
  @Input() movies: Movie[] = [];

  toggleWatched(movie: Movie) {
    movie.watched = !movie.watched;
  }

  removeMovie(movie: Movie) {
    const index = this.movies.indexOf(movie);
    if (index > -1) {
      this.movies.splice(index, 1);
    }
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}
