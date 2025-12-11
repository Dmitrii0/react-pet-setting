import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../config/supabase';

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  duration: number;
  category: 'home_visit' | 'clinic' | 'overnight' | 'daycare' | 'walking' | 'transport';
  features: string[];
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ServicesState {
  services: Service[];
  selectedService: Service | null;
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  selectedService: null,
  loading: false,
  error: null,
};

// Функция для преобразования данных из Supabase (snake_case) в формат приложения (camelCase)
function transformServiceFromSupabase(data: any): Service {
  // Обрабатываем features - может быть массивом или строкой
  let features = data.features;
  if (typeof features === 'string') {
    try {
      features = JSON.parse(features);
    } catch {
      // Если не JSON, пытаемся разбить по запятым
      features = features.split(',').map((f: string) => f.trim()).filter((f: string) => f);
    }
  }
  if (!Array.isArray(features)) {
    features = [];
  }

  return {
    id: data.id,
    name: data.name || 'Nimetön palvelu',
    description: data.description || 'Ei kuvausta saatavilla.',
    price: data.price || 0,
    duration: data.duration || 60,
    category: data.category || 'home_visit',
    features: features,
    icon: data.icon || 'ri-service-line',
    isActive: data.is_active !== undefined ? data.is_active : true,
    createdAt: data.created_at || new Date().toISOString(),
    updatedAt: data.updated_at || new Date().toISOString(),
  };
}

// Функция для получения дефолтных услуг (fallback)
function getDefaultServices(): Service[] {
  return [
    {
      id: '1',
      name: 'Kotikäynnit',
      price: 35,
      description: 'Hoivaa lemmikillesi kotoa käsin. Mukavaa ja stressitöntä hoivaa tutussa ympäristössä.',
      duration: 60,
      category: 'home_visit' as const,
      features: ['Lääkärintarkastus kotona', 'Rokotukset kotona', 'Hoidot kotona', 'Yksilöllinen hoito'],
      icon: 'ri-home-heart-line',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Lemmikkien Hoitola',
      price: 25,
      description: 'Moderni hoitola täydellä varustuksella kaikille lemmikkien hoitotarpeille.',
      duration: 120,
      category: 'clinic' as const,
      features: ['Päivittäinen hoito', 'Lääkärintarkastukset', 'Hoidot ja toimenpiteet', 'Valvottu ympäristö'],
      icon: 'ri-hospital-line',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Yöhoito Omassa Kodissasi',
      price: 50,
      description: 'Yöpäivystyspalvelu lemmikillesi kotona. Rauhallinen yöhoito tutussa ympäristössä.',
      duration: 480,
      category: 'overnight' as const,
      features: ['Yöpäivystys kotona', 'Valvonta ja hoito', 'Hätätilanteet', 'Rauhallinen yö'],
      icon: 'ri-moon-line',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Koirapäiväkoti Tuntivelvollisuudella',
      price: 15,
      description: 'Koirapäiväkoti, jossa koirasi voi viettää päivänsä muiden koirien kanssa.',
      duration: 480,
      category: 'daycare' as const,
      features: ['Päivähoito koirille', 'Sosiaalinen leikki', 'Valvottu toiminta', 'Joustava aikataulu'],
      icon: 'ri-calendar-line',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      name: 'Koiran Ulkoilutus',
      price: 12,
      description: 'Ammattitaitoista ulkoilutuspalvelua koirillesi. Säännölliset lenkit ja liikunta.',
      duration: 30,
      category: 'walking' as const,
      features: ['Säännölliset lenkit', 'Liikunta ja harjoittelu', 'Turvallinen ulkoilu', 'Henkilökohtainen palvelu'],
      icon: 'ri-walk-line',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '6',
      name: 'Lemmikkitaksi',
      price: 20,
      description: 'Turvallinen kuljetuspalvelu lemmikeillesi. Kuljetamme lemmikkejä turvallisesti.',
      duration: 45,
      category: 'transport' as const,
      features: ['Turvallinen kuljetus', 'Mukava matka', 'Joustava aikataulu', 'Erityisvarusteet'],
      icon: 'ri-car-line',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}

// Async thunk для загрузки услуг из Supabase
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📋 Загрузка услуг из Supabase...');
      
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });
      
      if (error) {
        console.warn('⚠️ Ошибка Supabase, используем дефолтные данные:', error);
        return getDefaultServices();
      }
      
      if (!data || data.length === 0) {
        console.warn('⚠️ Таблица services пуста, используем дефолтные данные');
        return getDefaultServices();
      }
      
      const services: Service[] = data.map(transformServiceFromSupabase);
      
      // Проверяем качество данных
      if (services.length < 6 || services.some(s => !s.name || !s.description)) {
        console.warn('⚠️ Данные из Supabase неполные, используем дефолтные данные');
        return getDefaultServices();
      }
      
      console.log(`✅ Загружено услуг из Supabase: ${services.length}`);
      return services;
    } catch (error: any) {
      console.warn('⚠️ Ошибка при загрузке услуг из Supabase, используем дефолтные данные:', error);
      return getDefaultServices();
    }
  }
);

// Async thunk для загрузки услуги по ID из Supabase
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.warn('⚠️ Услуга не найдена в Supabase, ищем в дефолтных данных');
        // Если не найдено в Supabase, ищем в дефолтных данных
        const defaultServices = getDefaultServices();
        const service = defaultServices.find(s => s.id === id);
        if (service) {
          return service;
        }
        throw new Error('Service not found');
      }
      
      if (!data) {
        throw new Error('Service not found');
      }
      
      return transformServiceFromSupabase(data);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch service');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedService: (state, action: PayloadAction<Service>) => {
      state.selectedService = action.payload;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedService = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedService, clearSelectedService, clearError } = servicesSlice.actions;
export default servicesSlice.reducer;
