import { StyleSheet, Text, View, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useMemo } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import Video from 'react-native-video'


const { width } = Dimensions.get('window')

const HeroSection = () => {
  const { data, loading } = useSelector(state => state.home)

  // API upcoming bookings
  const bookings = data?.upcoming_bookings || {
    booked_bookings: { bookings: [] },
    confirm_bookings: { bookings: [] },
    cancel_bookings: { bookings: [] },
  }

  // Default filter
  const [filter, setFilter] = useState("CONFIRMED")
  const [showDropdown, setShowDropdown] = useState(false)

  // Filter data based on dropdown
  const filteredData = useMemo(() => {
    if (filter === "CONFIRMED") {
      return bookings.confirm_bookings?.bookings || []
    }
    if (filter === "BOOKED") {
      return bookings.booked_bookings?.bookings || []
    }
    if (filter === "CANCELLED") {
      return bookings.cancel_bookings?.bookings || []
    }
    return []
  }, [filter, bookings])

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.title}>Bookings</Text>

      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.dropdownText}>{filter}</Text>
        <Icon name="chevron-down" size={22} color="#333" />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {showDropdown && (
        <View style={styles.dropdownMenu}>
          {["CONFIRMED", "BOOKED", "CANCELLED"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.dropdownItem}
              onPress={() => {
                setFilter(item)
                setShowDropdown(false)
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Loader */}
      {loading && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Loading bookings...</Text>
        </View>
      )}

      {/* Booking Cards */}
      {!loading && (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
          ListEmptyComponent={() => (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No {filter.toLowerCase()} bookings found
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                filter === "CANCELLED" && { borderLeftColor: 'red' },
                filter === "CONFIRMED" && { borderLeftColor: 'green' },
                filter === "BOOKED" && { borderLeftColor: 'orange' },
              ]}
            >
              <Text style={styles.status}>{filter}</Text>

              <Text style={styles.room}>
                {item.room_no || '--'} - {item.room_type || '--'}
              </Text>

              <View style={styles.row}>
                <Text>Name: {item.guest_name || '--'}</Text>
                <Text>Mobile: {item.mobile || '--'}</Text>
              </View>

              <View style={styles.row}>
                <Text>Checkin: {item.checkin_date || '--'}</Text>
                <Text>Checkout: {item.checkout_date || '--'}</Text>
              </View>

              <View style={styles.row}>
                <Text>Tariff: ₹ {item.total_tariff || 0}</Text>
                <Text>Paid: ₹ {item.paid_amount || 0}</Text>
              </View>

              <Text style={styles.bookedBy}>
                Booking By: {item.booked_by || '--'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

export default HeroSection

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },

  dropdownText: {
    fontSize: 14
  },

  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    overflow: 'hidden'
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#333'
  },

  card: {
    width: width * 0.92,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
    elevation: 2
  },

  status: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4
  },

  room: {
    fontSize: 13,
    marginBottom: 6
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  bookedBy: {
    marginTop: 5,
    fontStyle: 'italic'
  },

  emptyCard: {
    width: width * 0.92,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  emptyText: {
    fontSize: 14,
    color: '#777'
  }
})
