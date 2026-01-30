import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { fs } from '../../utils/responsive'; // only font & icon scaling

const { width } = Dimensions.get('window');

const CurrentBooking = () => {
  const { data, loading } = useSelector(state => state.home);

  // Real API data
  const bookings = data?.current_bookings?.bookings || [];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="meeting-room" size={fs(20)} color="#333" />
          <Text style={styles.room}>  Room {item.room_no}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'CHECKED_IN' ? '#4CAF50' : '#FF9800',
            },
          ]}
        >
          <Text style={styles.statusText}>
            {item.status.replace('_', ' ')}
          </Text>
        </View>
      </View>

      {/* Guest Info */}
      <View style={styles.row}>
        <Icon name="person" size={fs(16)} color="#555" />
        <Text style={styles.text}> {item.guest_name}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="location" size={fs(16)} color="#555" />
        <Text style={styles.text}> {item.address}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="call" size={fs(16)} color="#555" />
        <Text style={styles.text}> {item.mobile_no}</Text>
      </View>

      {/* Dates */}
      <View style={styles.dateRow}>
        <View style={styles.dateBox}>
          <Icon name="log-in-outline" size={fs(16)} color="#2196F3" />
          <Text style={styles.dateLabel}> Check-in</Text>
          <Text style={styles.dateValue}>
            {item.checkin_time || 'N/A'}
          </Text>
        </View>

        <View style={styles.dateBox}>
          <Icon name="log-out-outline" size={fs(16)} color="#F44336" />
          <Text style={styles.dateLabel}> Check-out</Text>
          <Text style={styles.dateValue}>
            {item.checkout_time || 'N/A'}
          </Text>
        </View>
      </View>

      {/* Bill */}
      <View style={styles.billRow}>
        <Icon name="receipt-outline" size={fs(16)} color="#444" />
        <Text style={styles.billText}> Bill No: {item.bill_no}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Bookings</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap:10}}
        ListEmptyComponent={() => (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              {loading ? 'Loading bookings...' : 'No current bookings found'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CurrentBooking;

const styles = StyleSheet.create({

  header: {
    fontSize: fs(18),
    fontWeight: '800',
    color: '#222',
    marginBottom: 10,
    // marginLeft: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: width * 0.92, 
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  room: {
    fontSize: fs(16),
    fontWeight: 'bold',
    color: '#333',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontSize: fs(12),
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  text: {
    fontSize: fs(13),
    color: '#555',
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  dateBox: {
    width: '48%',
    backgroundColor: '#e6e8f5',
    padding: 6,
    borderRadius: 8,
  },

  dateLabel: {
    fontSize: fs(12),
    color: '#777',
  },

  dateValue: {
    fontSize: fs(12),
    color: '#333',
  },

  billRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    paddingTop: 6,
  },

  billText: {
    fontSize: fs(13),
    fontWeight: '500',
    color: '#444',
  },

  emptyBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: width * 0.8,
    alignSelf: 'center',
  },

  emptyText: {
    fontSize: fs(14),
    color: '#777',
  },
});
