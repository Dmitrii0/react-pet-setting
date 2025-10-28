import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';
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

// Async thunk для удаления бронирования из Firebase
export const deleteBookingFromFirebase = createAsyncThunk(
  'bookings/deleteBookingFromFirebase',
  async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      return bookingId;
    } catch (error) {
      throw new Error('Failed to delete booking from Firebase');
    }
  }
);

// Async thunk для обновления статуса бронирования в Firebase
export const updateBookingStatusInFirebase = createAsyncThunk(
  'bookings/updateBookingStatusInFirebase',
  async ({ bookingId, status }: { bookingId: string; status: 'pending' | 'confirmed' | 'cancelled' }) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
      return { bookingId, status };
    } catch (error) {
      throw new Error('Failed to update booking status in Firebase');
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
      })
      // Delete booking from Firebase
      .addCase(deleteBookingFromFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookingFromFirebase.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      })
      .addCase(deleteBookingFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete booking';
      })
      // Update booking status in Firebase
      .addCase(updateBookingStatusInFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatusInFirebase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(booking => booking.id === action.payload.bookingId);
        if (index !== -1) {
          state.bookings[index].status = action.payload.status;
        }
      })
      .addCase(updateBookingStatusInFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update booking status';
      });
  }
});

export const { addBooking, updateBooking, deleteBooking, setLoading, setError, clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;