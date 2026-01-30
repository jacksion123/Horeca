import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGuests,
  fetchGuestsPagination,
} from '../../redux/features/Dashboard/guestSlice';
import LinearGradient from 'react-native-linear-gradient';

const statusColor = status => {
  switch (status) {
    case 'CHECKED_IN':
      return '#4CAF50';
    case 'CONFIRMED':
      return '#2196F3';
    case 'CHECKED_OUT':
      return '#9E9E9E';
    case 'CANCELLED':
      return '#F44336';
    default:
      return '#FF9800';
  }
};

const GuestSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const {
    data: guestData,
    loading,
    paginationLoading,
    error,
    page,
    hasMore,
  } = useSelector(state => state.guests);

  const list = guestData?.list || [];

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchGuests(query.trim()));
    }
  };

  const loadMoreData = () => {
    if (!paginationLoading && hasMore && query.trim()) {
      dispatch(
        fetchGuestsPagination({
          query: query.trim(),
          page: page + 1,
        })
      );
    }
  };

  const renderFooter = () => {
    if (!paginationLoading) return null;
    return <ActivityIndicator size="small" color="#2196F3" style={{ margin: 10 }} />;
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
  <View style={styles.header}>
    <Text style={styles.name}>{item.guest_name}</Text>
    <View
      style={[
        styles.statusBadge,
        { backgroundColor: statusColor(item.status) },
      ]}>
      <Text style={styles.statusText}>{item.status}</Text>
    </View>
  </View>

  <View style={{ flexDirection: 'row', gap: 6 }}>
    <Text style={styles.room}>Room {item.room_no}</Text>
    <Text style={styles.room}>({item.room_category})</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>Booking ID</Text>
    <Text style={styles.value}>{item.booking_id}</Text>
  </View>

  <View style={styles.row}>
    <Text style={styles.label}>Mobile</Text>
    <Text style={styles.value}>{item.mobile_no}</Text>
  </View>

  <View style={styles.dateRow}>
    <Text style={styles.dateLabel}>Booking Time</Text>
    <Text style={styles.dateValue}>{item.booking_time}</Text>
  </View>
</View>

  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter guest name"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleSearch}>
          <LinearGradient
            colors={['#7F00FF', '#d15eee']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 20 }} />
      )}

      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          {error}
        </Text>
      )}

      <FlatList
        data={list}
        keyExtractor={item => item.booking_id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && (
            <Text style={{ textAlign: 'center', marginTop: 30, color: '#777' }}>
              No guest found
            </Text>
          )
        }
      />
    </View>
  );
};

export default GuestSection;

const styles = StyleSheet.create({
  

  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    backgroundColor: '#FFF',
  },

  button: {
    marginLeft: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
    padding:10
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },


  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

  room: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  label: {
    fontSize: 12,
    color: '#777',
  },

  value: {
    fontSize: 12,
    color: '#222',
    fontWeight: '600',
  },

  dateRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },

  dateLabel: {
    fontSize: 11,
    color: '#777',
  },

  dateValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
  },
});

