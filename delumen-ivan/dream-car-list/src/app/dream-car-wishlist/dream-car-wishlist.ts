import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-dream-car-wishlist',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dream-car-wishlist.html',
  styleUrl: './dream-car-wishlist.scss'
})
export class DreamCarWishlist {
  carForm: FormGroup;
  wishlist = signal<Car[]>([]);
  nextId = signal(1);

  constructor(private fb: FormBuilder) {
    this.carForm = this.fb.group({
      carName: ['', [Validators.required, Validators.minLength(2)]],
      carBrand: ['', [Validators.required, Validators.minLength(2)]],
      carYear: [null, [Validators.required, Validators.min(1900), Validators.max(2030)]],
      carPrice: [null, [Validators.required, Validators.min(1)]],
      carElectric: [false],
      carGas: [false]
    });
  }

  onElectricChange(): void {
    if (this.carForm.get('carElectric')?.value) {
      this.carForm.patchValue({ carGas: false });
    }
  }

  onGasChange(): void {
    if (this.carForm.get('carGas')?.value) {
      this.carForm.patchValue({ carElectric: false });
    }
  }

  addCar(): void {
    if (this.carForm.invalid) {
      Object.keys(this.carForm.controls).forEach(key => {
        const control = this.carForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const formValue = this.carForm.value;
    const exists = this.wishlist().some((car: Car) => (
      car.name.toLowerCase() === formValue.carName.trim().toLowerCase() &&
      car.brand.toLowerCase() === formValue.carBrand.trim().toLowerCase() &&
      car.year === formValue.carYear
    ));

    if (exists) {
      alert('This car already exists in your wishlist.');
      return;
    }

    const newCar: Car = {
      id: this.nextId(),
      name: formValue.carName.trim(),
      brand: formValue.carBrand.trim(),
      year: formValue.carYear,
      price: formValue.carPrice,
      electric: formValue.carElectric,
      gas: formValue.carGas
    };

    this.wishlist.update(cars => [...cars, newCar]);
    this.nextId.update(id => id + 1);
    this.carForm.reset();
  }

  removeCar(id: number): void {
    this.wishlist.update(cars => cars.filter((car: Car) => car.id !== id));
  }

  clearForm(): void {
    this.carForm.reset({
      carName: '',
      carBrand: '',
      carYear: null,
      carPrice: null,
      carElectric: false,
      carGas: false
    });
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