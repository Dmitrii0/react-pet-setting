import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  fetchBookingsFromSupabase, 
  deleteBookingFromSupabase, 
  updateBookingStatusInSupabase 
} from '../store/slices/bookingsSlice';
import { isRejected } from '@reduxjs/toolkit';
import styled from 'styled-components';

// Простая защита паролем (для учебного проекта)
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const LoginBox = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 120px auto 80px;
  padding: 0 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
`;

const LogoutButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #d32f2f;
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
`;

const StatLabel = styled.div`
  color: #666;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const RevenueCard = styled(StatCard)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  ${StatNumber} {
    color: white;
  }
  
  ${StatLabel} {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const FiltersContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.7rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.7rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ExportButton = styled.button`
  padding: 0.7rem 1.5rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #388e3c;
    transform: translateY(-2px);
  }
`;

const BookingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BookingCard = styled.div<{ status: string }>`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => 
    props.status === 'confirmed' ? '#4caf50' :
    props.status === 'cancelled' ? '#f44336' : '#ff9800'
  };
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const BookingInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background: ${props => 
    props.status === 'confirmed' ? '#e8f5e9' :
    props.status === 'cancelled' ? '#ffebee' : '#fff3e0'
  };
  color: ${props => 
    props.status === 'confirmed' ? '#2e7d32' :
    props.status === 'cancelled' ? '#c62828' : '#e65100'
  };
`;

const CustomerInfo = styled.div`
  color: #666;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  
  div {
    margin: 0.3rem 0;
  }
`;

const BookingDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1.1rem;
  color: #333;
  font-weight: 600;
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const Button = styled.button<{ variant?: string }>`
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  ${props => {
    if (props.variant === 'danger') {
      return `
        background: #f44336;
        color: white;
        
        &:hover {
          background: #d32f2f;
        }
      `;
    }
    if (props.variant === 'success') {
      return `
        background: #4caf50;
        color: white;
        
        &:hover {
          background: #388e3c;
        }
      `;
    }
    if (props.variant === 'warning') {
      return `
        background: #ff9800;
        color: white;
        
        &:hover {
          background: #f57c00;
        }
      `;
    }
    return `
      background: #667eea;
      color: white;
      
      &:hover {
        background: #5568d3;
      }
    `;
  }}
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`;

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchBookingsFromSupabase() as any);
    }
  }, [dispatch, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Väärä salasana!');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const handleDelete = async (bookingId: string) => {
    if (window.confirm('Haluatko varmasti poistaa tämän varauksen?')) {
      await dispatch(deleteBookingFromSupabase(bookingId) as any);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const result = await dispatch(updateBookingStatusInSupabase({ bookingId, status: newStatus }) as any);
      if (isRejected(result)) {
        console.error('Failed to update status:', result.error);
        const errorMsg = result.error.message || 'Unknown error';
        
        if (errorMsg.includes('not found')) {
          alert(`Varaus ei löytynyt!\n\nVaraus on todennäköisesti poistettu.\nPäivitä sivu nähdäksesi uusimmat varaukset.`);
          // Обновляем список бронирований после ошибки
          dispatch(fetchBookingsFromSupabase() as any);
        } else {
          alert(`Virhe: ${errorMsg}\n\nTarkista Firebase Console → Firestore → Rules että kirjoitus on sallittu.`);
        }
      }
    } catch (error: any) {
      console.error('Error updating status:', error);
      alert(`Virhe päivittäessä tilaa: ${error.message || 'Tuntematon virhe'}`);
    }
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Palvelu', 'Asiakas', 'Sähköposti', 'Puhelin', 'Lemmikki', 'Päivämäärä', 'Aika', 'Hinta', 'Tila', 'Luotu'];
    const rows = filteredBookings.map(booking => [
      booking.id,
      booking.serviceName,
      booking.customerName,
      booking.customerEmail,
      booking.customerPhone,
      booking.petName,
      booking.date,
      booking.time,
      `${booking.price}€`,
      booking.status === 'confirmed' ? 'Vahvistettu' : booking.status === 'cancelled' ? 'Peruttu' : 'Odottaa',
      new Date(booking.createdAt).toLocaleString('fi-FI')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `varaukset_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Фильтрация бронирований
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    if (!searchQuery) {
      return matchesStatus;
    }
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (booking.customerName?.toLowerCase() || '').includes(searchLower) ||
      (booking.customerEmail?.toLowerCase() || '').includes(searchLower) ||
      (booking.serviceName?.toLowerCase() || '').includes(searchLower) ||
      (booking.petName?.toLowerCase() || '').includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  // Статистика
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + (b.price || 0), 0);

  // Если не авторизован, показываем форму входа
  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginBox>
          <LoginTitle>🔐 Admin Paneeli</LoginTitle>
          <form onSubmit={handleLogin}>
            <LoginInput
              type="password"
              placeholder="Salasana"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <LoginButton type="submit">Kirjaudu sisään</LoginButton>
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
          </form>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
            💡 Oletus salasana: admin123
          </p>
        </LoginBox>
      </LoginContainer>
    );
  }

  return (
    <Container>
      <PageHeader>
        <PageTitle>🔧 Admin Paneeli</PageTitle>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button 
            onClick={() => dispatch(fetchBookingsFromSupabase() as any)}
            disabled={loading}
            style={{ background: '#2196f3' }}
          >
            🔄 Päivitä lista
          </Button>
          <ExportButton onClick={exportToCSV}>
            📥 Vie CSV
          </ExportButton>
          <LogoutButton onClick={handleLogout}>
            Kirjaudu ulos
          </LogoutButton>
        </div>
      </PageHeader>

      {loading && <LoadingMessage>Ladataan...</LoadingMessage>}
      {error && <div style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        background: '#ffebee', 
        color: '#c62828', 
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>Virhe: {error}</div>}

      {!loading && !error && (
        <>
          {/* Статистика */}
          <StatsContainer>
            <StatCard>
              <StatNumber>{totalBookings}</StatNumber>
              <StatLabel>Yhteensä varauksia</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber style={{ color: '#ff9800' }}>{pendingBookings}</StatNumber>
              <StatLabel>Odottaa vahvistusta</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber style={{ color: '#4caf50' }}>{confirmedBookings}</StatNumber>
              <StatLabel>Vahvistettu</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber style={{ color: '#f44336' }}>{cancelledBookings}</StatNumber>
              <StatLabel>Peruttu</StatLabel>
            </StatCard>
            <RevenueCard>
              <StatNumber>{totalRevenue}€</StatNumber>
              <StatLabel>Kokonaistulot</StatLabel>
            </RevenueCard>
          </StatsContainer>

          {/* Фильтры */}
          <FiltersContainer>
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Kaikki tilat</option>
              <option value="pending">Odottaa</option>
              <option value="confirmed">Vahvistettu</option>
              <option value="cancelled">Peruttu</option>
            </FilterSelect>

            <SearchInput
              type="text"
              placeholder="Etsi nimi, sähköposti, palvelu tai lemmikki..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FiltersContainer>

          {/* Список бронирований */}
          {filteredBookings.length === 0 ? (
            <EmptyMessage>
              {bookings.length === 0 
                ? 'Ei varauksia vielä' 
                : 'Ei varauksia löytynyt hakuehdoilla'}
            </EmptyMessage>
          ) : (
            <BookingsList>
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} status={booking.status}>
                  <BookingHeader>
                    <BookingInfo>
                      <ServiceName>{booking.serviceName}</ServiceName>
                      <StatusBadge status={booking.status}>
                        {booking.status === 'confirmed' ? '✅ Vahvistettu' :
                         booking.status === 'cancelled' ? '❌ Peruttu' : '⏳ Odottaa'}
                      </StatusBadge>
                      <CustomerInfo>
                        <div><strong>Asiakas:</strong> {booking.customerName}</div>
                        <div><strong>Sähköposti:</strong> {booking.customerEmail}</div>
                        <div><strong>Puhelin:</strong> {booking.customerPhone}</div>
                      </CustomerInfo>
                    </BookingInfo>
                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#667eea', textAlign: 'right' }}>
                      {booking.price}€
                    </div>
                  </BookingHeader>

                  <BookingDetails>
                    <DetailItem>
                      <DetailLabel>Lemmikin nimi</DetailLabel>
                      <DetailValue>{booking.petName}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Lemmikin laji</DetailLabel>
                      <DetailValue>{booking.petType}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Aloituspäivä</DetailLabel>
                      <DetailValue>{(booking as any).startDate || booking.date}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Lopetuspäivä</DetailLabel>
                      <DetailValue>{(booking as any).endDate || booking.date}</DetailValue>
                    </DetailItem>
                    {booking.time && (
                      <DetailItem>
                        <DetailLabel>Aika</DetailLabel>
                        <DetailValue>{booking.time}</DetailValue>
                      </DetailItem>
                    )}
                  </BookingDetails>

                  {booking.message && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '1rem', 
                      background: '#f8f9fa', 
                      borderRadius: '10px',
                      fontStyle: 'italic',
                      color: '#666'
                    }}>
                      <strong>Viesti:</strong> "{booking.message}"
                    </div>
                  )}

                  <ActionsContainer>
                    {booking.status !== 'confirmed' && (
                      <Button 
                        variant="success" 
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                      >
                        ✅ Vahvista
                      </Button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <Button 
                        variant="warning" 
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      >
                        ❌ Peruuta
                      </Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button 
                        onClick={() => handleStatusChange(booking.id, 'pending')}
                      >
                        ⏳ Palauta odottamaan
                      </Button>
                    )}
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(booking.id)}
                    >
                      🗑️ Poista
                    </Button>
                  </ActionsContainer>

                  <div style={{ 
                    marginTop: '1rem', 
                    fontSize: '0.85rem', 
                    color: '#999',
                    textAlign: 'right'
                  }}>
                    Luotu: {new Date(booking.createdAt).toLocaleString('fi-FI')}
                  </div>
                </BookingCard>
              ))}
            </BookingsList>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminPage;

