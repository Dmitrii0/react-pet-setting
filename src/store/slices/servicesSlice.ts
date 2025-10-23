import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

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
  services: [
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
  ],
  selectedService: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/services');
      return response.data.data.services;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data.data.service;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service');
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




