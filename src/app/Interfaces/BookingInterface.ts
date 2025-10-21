export interface Booking {
  finalAmount: string | number;
  id: string;
  car: {
    brand: any;
    category: any;
    name: string;
    image: string;
    type: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  price: number;
  status: 'confirmed' | 'cancelled' | 'upcoming';
}
