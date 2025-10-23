import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

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
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

// Async thunk для добавления бронирования в Firebase
export const addBookingToFirebase = createAsyncThunk(
  'bookings/addBookingToFirebase',
  async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...booking,
        createdAt: new Date().toISOString()
      });
      
      return {
        id: docRef.id,
        ...booking,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      throw new Error('Failed to add booking to Firebase');
    }
  }
);

// Async thunk для загрузки бронирований из Firebase
export const fetchBookingsFromFirebase = createAsyncThunk(
  'bookings/fetchBookingsFromFirebase',
  async () => {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const bookings: Booking[] = [];
      querySnapshot.forEach((doc) => {
        bookings.push({
          id: doc.id,
          ...doc.data()
        } as Booking);
      });
      
      return bookings;
    } catch (error) {
      throw new Error('Failed to fetch bookings from Firebase');
    }
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add booking to Firebase
      .addCase(addBookingToFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookingToFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBookingToFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add booking';
      })
      // Fetch bookings from Firebase
      .addCase(fetchBookingsFromFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingsFromFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      });
  }
});

export const { addBooking, updateBooking, deleteBooking, setLoading, setError, clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;