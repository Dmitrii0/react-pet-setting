import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabase';
import { BookingInsert } from '../../types/supabase';

// Интерфейс для работы в приложении (camelCase)
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
  startDate?: string;
  endDate?: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
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

// Функция для преобразования данных из Supabase (snake_case) в формат приложения (camelCase)
function transformBookingFromSupabase(data: any): Booking {
  return {
    id: data.id,
    serviceId: data.service_id,
    serviceName: data.service_name,
    price: data.price,
    customerName: data.customer_name,
    customerEmail: data.customer_email,
    customerPhone: data.customer_phone,
    petName: data.pet_name,
    petType: data.pet_type,
    date: data.date,
    time: data.time,
    startDate: data.start_date,
    endDate: data.end_date,
    message: data.message,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

// Функция для преобразования данных приложения (camelCase) в формат Supabase (snake_case)
function transformBookingToSupabase(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): BookingInsert {
  return {
    service_id: booking.serviceId,
    service_name: booking.serviceName,
    price: booking.price,
    customer_name: booking.customerName,
    customer_email: booking.customerEmail,
    customer_phone: booking.customerPhone,
    pet_name: booking.petName,
    pet_type: booking.petType,
    date: booking.date,
    time: booking.time,
    start_date: booking.startDate,
    end_date: booking.endDate,
    message: booking.message,
    status: booking.status || 'pending',
    created_at: new Date().toISOString(),
  };
}

// Async thunk для добавления бронирования в Supabase
export const addBookingToSupabase = createAsyncThunk(
  'bookings/addBookingToSupabase',
  async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('📝 Сохранение бронирования в Supabase:', booking);
      
      const bookingData = transformBookingToSupabase(booking);
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();
      
      if (error) {
        console.error('❌ Ошибка Supabase:', error);
        throw new Error(error.message || 'Failed to add booking to Supabase');
      }
      
      if (!data) {
        throw new Error('No data returned from Supabase');
      }
      
      console.log('✅ Бронирование успешно сохранено! ID:', data.id);
      
      const transformedBooking = transformBookingFromSupabase(data);
      return transformedBooking;
    } catch (error: any) {
      console.error('❌ Ошибка при сохранении бронирования:', error);
      const errorMessage = error?.message || 'Failed to add booking to Supabase';
      throw new Error(errorMessage);
    }
  }
);

// Async thunk для загрузки бронирований из Supabase
export const fetchBookingsFromSupabase = createAsyncThunk(
  'bookings/fetchBookingsFromSupabase',
  async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Ошибка Supabase:', error);
        throw new Error(error.message || 'Failed to fetch bookings from Supabase');
      }
      
      if (!data) {
        return [];
      }
      
      const bookings: Booking[] = data.map(transformBookingFromSupabase);
      console.log(`✅ Загружено бронирований: ${bookings.length}`);
      
      return bookings;
    } catch (error: any) {
      console.error('❌ Ошибка при загрузке бронирований:', error);
      throw new Error(error?.message || 'Failed to fetch bookings from Supabase');
    }
  }
);

// Async thunk для удаления бронирования из Supabase
export const deleteBookingFromSupabase = createAsyncThunk(
  'bookings/deleteBookingFromSupabase',
  async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);
      
      if (error) {
        console.error('❌ Ошибка Supabase:', error);
        throw new Error(error.message || 'Failed to delete booking from Supabase');
      }
      
      console.log('✅ Бронирование удалено! ID:', bookingId);
      return bookingId;
    } catch (error: any) {
      console.error('❌ Ошибка при удалении бронирования:', error);
      throw new Error(error?.message || 'Failed to delete booking from Supabase');
    }
  }
);

// Async thunk для обновления статуса бронирования в Supabase
export const updateBookingStatusInSupabase = createAsyncThunk(
  'bookings/updateBookingStatusInSupabase',
  async ({ bookingId, status }: { bookingId: string; status: 'pending' | 'confirmed' | 'cancelled' }) => {
    try {
      if (!bookingId) {
        throw new Error('Booking ID is required');
      }
      
      // Проверяем, существует ли бронирование
      const { data: existingBooking, error: fetchError } = await supabase
        .from('bookings')
        .select('id')
        .eq('id', bookingId)
        .single();
      
      if (fetchError || !existingBooking) {
        throw new Error(`Booking with ID ${bookingId} not found in Supabase. It may have been deleted.`);
      }
      
      const { data, error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .select()
        .single();
      
      if (error) {
        console.error('❌ Ошибка Supabase:', error);
        throw new Error(error.message || 'Failed to update booking status in Supabase');
      }
      
      if (!data) {
        throw new Error('No data returned from Supabase');
      }
      
      console.log('✅ Статус бронирования обновлен! ID:', bookingId, 'Status:', status);
      
      return { bookingId, status };
    } catch (error: any) {
      console.error('❌ Ошибка при обновлении статуса бронирования:', error);
      const errorMessage = error?.message || 'Failed to update booking status in Supabase';
      throw new Error(errorMessage);
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
      // Add booking to Supabase
      .addCase(addBookingToSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookingToSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBookingToSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add booking';
      })
      // Fetch bookings from Supabase
      .addCase(fetchBookingsFromSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingsFromSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsFromSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      // Delete booking from Supabase
      .addCase(deleteBookingFromSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBookingFromSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      })
      .addCase(deleteBookingFromSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete booking';
      })
      // Update booking status in Supabase
      .addCase(updateBookingStatusInSupabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatusInSupabase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bookings.findIndex(booking => booking.id === action.payload.bookingId);
        if (index !== -1) {
          state.bookings[index].status = action.payload.status;
        }
      })
      .addCase(updateBookingStatusInSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update booking status';
      });
  }
});

export const { addBooking, updateBooking, deleteBooking, setLoading, setError, clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;
