import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchLogsData } from '../../redux/features/ActivityLogs/ActivityLogs';

// ------------------- ICON & COLOR MAPPING -------------------
const getTypeIcon = (type) => {
  switch (type) {
    case 'ROOM_BOOKED':
      return <Icon name="bed-outline" size={18} color="#4CAF50" />;
    case 'ROOM_CHECKEDIN':
      return <Icon name="check-circle-outline" size={18} color="#03A9F4" />;
    case 'UPDATE_TARIFF':
      return <Icon name="currency-usd" size={18} color="#FF9800" />;
    case 'SIGN_IN':
      return <Icon name="login" size={18} color="#9C27B0" />;
    case 'EXPENSE':
      return <Icon name="cash-minus" size={18} color="#F44336" />;
    default:
      return <Icon name="alert-circle-outline" size={18} color="#607D8B" />;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'ROOM_BOOKED': return '#4CAF50';
    case 'ROOM_CHECKEDIN': return '#03A9F4';
    case 'UPDATE_TARIFF': return '#FF9800';
    case 'SIGN_IN': return '#9C27B0';
    case 'EXPENSE': return '#F44336';
    default: return '#607D8B';
  }
};

// ------------------- MAIN SCREEN -------------------
const ActivityLogScreen = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.activity);
  const logs = data?.list || [];

  const [activityType, setActivityType] = useState('all');
  const [reference, setReference] = useState('');

  useEffect(() => {
    dispatch(fetchLogsData({ activityType: 'all', reference: '' }));
  }, [dispatch]);

  const onSearch = () => {
    dispatch(fetchLogsData({
      activityType,
      reference,
      page: 1,
    }));
  };

  const renderItem = ({ item, index }) => {
    const color = getTypeColor(item.type);

    return (
      <View style={styles.timelineRow}>
        {/* Timeline Line */}
       
        {/* Log Card */}
        <View style={styles.logCard}>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {getTypeIcon(item.type)}
              <Text style={styles.typeText}>{item.type.replace('_', ' ')}</Text>
            </View>
            <Text style={[styles.ref, { color }]}>{item.ref_id}</Text>
          </View>

          <Text style={styles.remark}>{item.remark}</Text>

          <View style={styles.footer}>
            <Text style={styles.time}>{item.activity_time}</Text>
            <Text style={styles.by}>By {item.activity_done_by}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Filters */}
      <View style={styles.filterBox}>
        <Picker
          selectedValue={activityType}
          onValueChange={value => setActivityType(value)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Room Booking" value="RB" />
          <Picker.Item label="Expense" value="EXP" />
        </Picker>

        <TextInput
          placeholder="Reference Number"
          value={reference}
          onChangeText={setReference}
          style={styles.input}
        />

        <TouchableOpacity onPress={onSearch} activeOpacity={0.8}>
          <LinearGradient
            colors={['#7F00FF', '#d15eee']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.searchBtn}
          >
            <Text style={styles.searchText}>Search</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Loader & Error */}
      {loading && <ActivityIndicator size="large" color="#000" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {!loading && logs.length === 0 && (
        <Text style={styles.emptyText}>No activity logs found</Text>
      )}
      <FlatList
        data={logs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

    </View>
  );
};

export default ActivityLogScreen;

const styles = StyleSheet.create({
  
  filterBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  picker: {
    height: 55,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginTop: 8,
  },
  searchBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  searchText: {
    color: '#fff',
    fontWeight: '700',
  },

  // Timeline
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timeline: {
    width: 30,
    alignItems: 'center',
  },
  dotGradient: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#ddd',
    marginTop: 2,
  },

  logCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  ref: {
    fontSize: 11,
    fontWeight: '600',
  },
  remark: {
    fontSize: 13,
    color: '#444',
    marginVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  time: {
    fontSize: 11,
    color: '#777',
  },
  by: {
    fontSize: 11,
    color: '#333',
    fontWeight: '600',
  },

  // Loader & Empty
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
