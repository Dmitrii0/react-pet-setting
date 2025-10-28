import api from './api';

export interface CreateBookingRequest {
  serviceId: string;
  petId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  notes?: string;
  specialInstructions?: string;
  address: string;
  city: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Booking {
  id: string;
  customerId: string;
  sitterId?: string;
  serviceId: string;
  petId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  specialInstructions?: string;
  address: string;
  city: string;
  postalCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
  };
}

export interface BookingsResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const bookingService = {
  async createBooking(bookingData: CreateBookingRequest): Promise<BookingResponse> {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  async getBookingById(id: string): Promise<BookingResponse> {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  async getUserBookings(page = 1, limit = 10, status?: string): Promise<BookingsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(status && { status })
    });
    
    const response = await api.get(`/bookings/my-bookings?${params}`);
    return response.data;
  },

  async updateBooking(id: string, updateData: Partial<CreateBookingRequest>): Promise<BookingResponse> {
    const response = await api.put(`/bookings/${id}`, updateData);
    return response.data;
  },

  async cancelBooking(id: string): Promise<BookingResponse> {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  }
};





