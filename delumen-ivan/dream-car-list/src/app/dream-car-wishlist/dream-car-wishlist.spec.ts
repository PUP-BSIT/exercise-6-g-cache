import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamCarWishlist } from './dream-car-wishlist';

describe('DreamCarWishlist', () => {
  let component: DreamCarWishlist;
  let fixture: ComponentFixture<DreamCarWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DreamCarWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DreamCarWishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
