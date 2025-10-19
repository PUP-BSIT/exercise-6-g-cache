import { Component, signal } from '@angular/core';
import { DreamCarWishlist } from './dream-car-wishlist/dream-car-wishlist';

@Component({
  selector: 'app-root',
  imports: [DreamCarWishlist],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('dream-car-wishlist');
}