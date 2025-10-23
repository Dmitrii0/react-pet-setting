import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  petName: string;
  petType: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<{ id: string; updates: Partial<Booking> }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.id);
      if (booking) {
        Object.assign(booking, action.payload.updates);
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(b => b.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addBooking, updateBooking, deleteBooking, setLoading } = bookingsSlice.actions;
export default bookingsSlice.reducer;





