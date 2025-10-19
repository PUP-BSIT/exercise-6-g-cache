import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Movie } from '../movie-form/movie-form';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.sass']
})
export class MovieList {
  @Input() public movies: Movie[] = [];
  @Output() public movieToggled = new EventEmitter<Movie>();
  @Output() public movieRemoved = new EventEmitter<Movie>();

  public toggleWatched(movie: Movie): void {
    const updatedMovie: Movie = { ...movie, watched: !movie.watched };
    this.movieToggled.emit(updatedMovie);
  }

  public removeMovie(movie: Movie): void {
    this.movieRemoved.emit(movie);
  }

  public trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}
