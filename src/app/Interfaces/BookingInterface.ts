export interface Booking {
  id: string;
  car: {
    name: string;
    image: string;
    type: string;
  };
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}
