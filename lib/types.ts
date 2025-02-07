export interface Property {
  id: string;
  name: string;
  address: string;
  price: number;
  size: number;
  rooms: number;
  imageUrl: string;
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  minSize: number;
  maxSize: number;
  rooms: number;
}
