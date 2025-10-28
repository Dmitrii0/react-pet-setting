import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  fetchBookingsFromFirebase, 
  deleteBookingFromFirebase, 
  updateBookingStatusInFirebase 
} from '../store/slices/bookingsSlice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 120px auto 80px;
  padding: 0 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
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
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
`;

const StatLabel = styled.div`
  color: #666;
  margin-top: 0.5rem;
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
  padding: 0.5rem 1rem;
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
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
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

const CustomerInfo = styled.div`
  color: #666;
  margin-top: 0.5rem;
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

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => 
    props.status === 'confirmed' ? '#e8f5e9' :
    props.status === 'cancelled' ? '#ffebee' : '#fff3e0'
  };
  color: ${props => 
    props.status === 'confirmed' ? '#2e7d32' :
    props.status === 'cancelled' ? '#c62828' : '#e65100'
  };
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

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: #ffebee;
  color: #c62828;
  border-radius: 10px;
  font-size: 1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`;

const BookingsManagementPage: React.FC = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state: RootState) => state.bookings);
  
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBookingsFromFirebase() as any);
  }, [dispatch]);

  const handleDelete = async (bookingId: string) => {
    if (window.confirm('Haluatko varmasti poistaa tämän varauksen?')) {
      await dispatch(deleteBookingFromFirebase(bookingId) as any);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    await dispatch(updateBookingStatusInFirebase({ bookingId, status: newStatus }) as any);
  };

  // Фильтрация бронирований
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.petName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Статистика
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

  return (
    <Container>
      <PageTitle>Varaushallinta</PageTitle>

      {loading && <LoadingMessage>Ladataan...</LoadingMessage>}
      {error && <ErrorMessage>Virhe: {error}</ErrorMessage>}

      {!loading && !error && (
        <>
          {/* Статистика */}
          <StatsContainer>
            <StatCard>
              <StatNumber>{totalBookings}</StatNumber>
              <StatLabel>Yhteensä</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber style={{ color: '#ff9800' }}>{pendingBookings}</StatNumber>
              <StatLabel>Odottaa</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber style={{ color: '#4caf50' }}>{confirmedBookings}</StatNumber>
              <StatLabel>Vahvistettu</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber style={{ color: '#f44336' }}>{cancelledBookings}</StatNumber>
              <StatLabel>Peruttu</StatLabel>
            </StatCard>
          </StatsContainer>

          {/* Фильтры */}
          <FiltersContainer>
            <FilterSelect 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Kaikki</option>
              <option value="pending">Odottaa</option>
              <option value="confirmed">Vahvistettu</option>
              <option value="cancelled">Peruttu</option>
            </FilterSelect>

            <SearchInput
              type="text"
              placeholder="Etsi nimi, sähköposti tai palvelu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FiltersContainer>

          {/* Список бронирований */}
          {filteredBookings.length === 0 ? (
            <EmptyMessage>
              Ei varauksia löytynyt
            </EmptyMessage>
          ) : (
            <BookingsList>
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} status={booking.status}>
                  <BookingHeader>
                    <BookingInfo>
                      <ServiceName>{booking.serviceName}</ServiceName>
                      <StatusBadge status={booking.status}>
                        {booking.status === 'confirmed' ? 'Vahvistettu' :
                         booking.status === 'cancelled' ? 'Peruttu' : 'Odottaa'}
                      </StatusBadge>
                      <CustomerInfo>
                        <div>Nimi: {booking.customerName}</div>
                        <div>Sähköposti: {booking.customerEmail}</div>
                        <div>Puhelin: {booking.customerPhone}</div>
                      </CustomerInfo>
                    </BookingInfo>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#667eea' }}>
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
                      <DetailLabel>Päivämäärä</DetailLabel>
                      <DetailValue>{booking.date}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Aika</DetailLabel>
                      <DetailValue>{booking.time}</DetailValue>
                    </DetailItem>
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
                      "{booking.message}"
                    </div>
                  )}

                  <ActionsContainer>
                    {booking.status !== 'confirmed' && (
                      <Button 
                        variant="success" 
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                      >
                        Vahvista
                      </Button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <Button 
                        variant="warning" 
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      >
                        Peruuta
                      </Button>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button 
                        onClick={() => handleStatusChange(booking.id, 'pending')}
                      >
                        Palauta odottamaan
                      </Button>
                    )}
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(booking.id)}
                    >
                      Poista
                    </Button>
                  </ActionsContainer>

                  <div style={{ 
                    marginTop: '1rem', 
                    fontSize: '0.9rem', 
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

export default BookingsManagementPage;

