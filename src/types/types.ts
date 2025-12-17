export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          service_id: string;
          service_name: string;
          price: number;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          pet_name: string;
          pet_type: string;
          date: string;
          time: string;
          start_date?: string;
          end_date?: string;
          message?: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          service_name: string;
          price: number;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          pet_name: string;
          pet_type: string;
          date: string;
          time: string;
          start_date?: string;
          end_date?: string;
          message?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<{
          id: string;
          service_id: string;
          service_name: string;
          price: number;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          pet_name: string;
          pet_type: string;
          date: string;
          time: string;
          start_date: string;
          end_date: string;
          message: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
          updated_at: string;
        }>;
      };
      services: { /* оставляем как есть */ };
    };
  };
}

export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];
