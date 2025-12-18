// Типы для таблиц Supabase

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
        Update: {
          id?: string;
          service_id?: string;
          service_name?: string;
          price?: number;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          pet_name?: string;
          pet_type?: string;
          date?: string;
          time?: string;
          start_date?: string;
          end_date?: string;
          message?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          duration: number;
          category: 'home_visit' | 'clinic' | 'overnight' | 'daycare' | 'walking' | 'transport';
          features: string[];
          icon: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          duration: number;
          category: 'home_visit' | 'clinic' | 'overnight' | 'daycare' | 'walking' | 'transport';
          features: string[];
          icon: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          duration?: number;
          category?: 'home_visit' | 'clinic' | 'overnight' | 'daycare' | 'walking' | 'transport';
          features?: string[];
          icon?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Типы для работы с данными в приложении
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];

export type Service = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUpdate = Database['public']['Tables']['services']['Update'];






