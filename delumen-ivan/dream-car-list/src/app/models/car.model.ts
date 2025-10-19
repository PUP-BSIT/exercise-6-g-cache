export type Car = {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  electric: boolean;
  gas: boolean;
};

export type CarFormData = {
  carName: string;
  carBrand: string;
  carYear: number | null;
  carPrice: number | null;
  carElectric: boolean;
  carGas: boolean;
};
