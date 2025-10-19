import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-dream-car-wishlist',
  imports: [FormsModule, CommonModule],
  templateUrl: './dream-car-wishlist.html',
  styleUrl: './dream-car-wishlist.scss'
})
export class DreamCarWishlist {
  carName = signal('');
  carBrand = signal('');
  carYear = signal<number | null>(null);
  carPrice = signal<number | null>(null);
  carElectric = signal(false);
  carGas = signal(false);

  wishlist = signal<Car[]>([]);
  nextId = signal(1);

  onElectricChange(): void {
    if (this.carElectric()) {
      this.carGas.set(false);
    }
  }

  onGasChange(): void {
    if (this.carGas()) {
      this.carElectric.set(false);
    }
  }

  addCar(): void {
    if (!this.carName().trim() || !this.carBrand().trim() || !this.carYear() || this.carYear()! < 1900 || !this.carPrice() || this.carPrice()! <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    const exists = this.wishlist().some((car: Car) => (
      car.name.toLowerCase() === this.carName().trim().toLowerCase() &&
      car.brand.toLowerCase() === this.carBrand().trim().toLowerCase() &&
      car.year === this.carYear()!
    ));
    if (exists) {
      alert('This car already exists in your wishlist.');
      return;
    }

    const newCar: Car = {
      id: this.nextId(),
      name: this.carName().trim(),
      brand: this.carBrand().trim(),
      year: this.carYear()!,
      price: this.carPrice()!,
      electric: this.carElectric(),
      gas: this.carGas()
    };

    this.wishlist.update(cars => [...cars, newCar]);
    this.nextId.update(id => id + 1);
    this.clearForm();
  }

  removeCar(id: number): void {
    this.wishlist.update(cars => cars.filter((car: Car) => car.id !== id));
  }

  clearForm(): void {
    this.carName.set('');
    this.carBrand.set('');
    this.carYear.set(null);
    this.carPrice.set(null);
    this.carElectric.set(false);
    this.carGas.set(false);
  }

  formatPrice(price: number): string {
    return '₱' + price.toLocaleString();
  }

  getFuelType(car: Car): string {
    if (car.electric) return 'Electric';
    if (car.gas) return 'Gas';
    return 'Not specified';
  }

  trackByCarId(index: number, car: Car): number {
    return car.id;
  }
}