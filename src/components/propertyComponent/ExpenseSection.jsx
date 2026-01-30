import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CalendarPicker from 'react-native-calendar-picker'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import {
  fetchExpenseData,
  fetchExpensePagination,
} from '../../redux/features/Dashboard/ExpenseSlice'
import AddExpense from './AddExpense'

const ExpenseSection = () => {
  const dispatch = useDispatch()

  const {
    data,
    loading,
    paginationLoading,
    page,
    hasMore,
  } = useSelector(state => state.expense)

  const bills = data?.list || []

  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    const today = new Date()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(today.getDate() - 7)

    setCheckOut(today)
    setCheckIn(oneWeekAgo)

    const from_date = format(oneWeekAgo, 'yyyy-MM-dd')
    const to_date = format(today, 'yyyy-MM-dd')

    dispatch(fetchExpenseData({ from_date, to_date }))
  }, [])

  const onDateChange = (date, type) => {
    if (type === 'START_DATE') {
      setCheckIn(date)
      setCheckOut(null)
    } else {
      setCheckOut(date)
      setShowCalendar(false)
    }
  }

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Please select From & To date')
      return
    }

    const from_date = format(new Date(checkIn), 'yyyy-MM-dd')
    const to_date = format(new Date(checkOut), 'yyyy-MM-dd')

    dispatch(fetchExpenseData({ from_date, to_date }))
  }

  // 🔥 Pagination handler
  const loadMoreData = () => {
    if (paginationLoading || !hasMore || loading) return

    const from_date = format(new Date(checkIn), 'yyyy-MM-dd')
    const to_date = format(new Date(checkOut), 'yyyy-MM-dd')

    dispatch(
      fetchExpensePagination({
        from_date,
        to_date,
        page: page + 1,
      })
    )
  }

  const renderFooter = () => {
    if (!paginationLoading) return null
    return <ActivityIndicator size="small" style={{ marginVertical: 15 }} />
  }

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.modeBadge}>
          <Text style={styles.modeText}>{item.mode}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.expense_date}</Text>
      </View>

      <View style={styles.amountBox}>
        <Text style={styles.amountText}>₹ {item.price}</Text>
      </View>

      <View style={styles.remarkBox}>
        <Text style={styles.remarkLabel}>Remark</Text>
        <Text style={styles.remarkText}>{item.remark || 'N/A'}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.addedBy}>Added by: {item.added_by}</Text>

        {item.docs && (
          <TouchableOpacity>
            <LinearGradient
              colors={['#7F00FF', '#d15eee']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.viewDocBtn}
            >
              <Text style={styles.viewDocText}>View Docs</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row",justifyContent:'space-between',marginBottom:16}}>
      <Text style={styles.heading}>Expense Bills</Text>
      <AddExpense/>
      </View>

      {/* Date selectors */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowCalendar(true)}
        >
          <Text>
            {checkIn ? format(new Date(checkIn), 'dd MMM yyyy') : 'From Date'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => setShowCalendar(true)}
        >
          <Text>
            {checkOut ? format(new Date(checkOut), 'dd MMM yyyy') : 'To Date'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CalendarPicker
              allowRangeSelection
              onDateChange={onDateChange}
              selectedStartDate={checkIn}
              selectedEndDate={checkOut}
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleSearch}>
        <LinearGradient
          colors={['#7F00FF', '#d15eee']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.searchBtn}
        >
          <Text style={styles.searchText}>Search Expenses</Text>
        </LinearGradient>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={bills}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No expense records found</Text>
          }
        />
      )}
    </View>
  )
}

export default ExpenseSection


const styles = StyleSheet.create({

  heading: {
    fontSize: 22,
    fontWeight: '800',
    // marginBottom: 12,
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  dateBox: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },

  searchBtn: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 3,
  },

  searchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
  },

  modeBadge: {
    backgroundColor: '#f3e5ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  modeText: {
    color: '#7F00FF',
    fontWeight: '700',
    fontSize: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },

  amountBox: {
    marginTop: 10,
    backgroundColor: '#ecf9f1',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  amountText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#27ae60',
  },

  remarkBox: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#fafafa',
    borderRadius: 6,
  },

  remarkLabel: {
    fontSize: 12,
    color: '#777',
    fontWeight: '600',
  },

  remarkText: {
    fontSize: 13,
    color: '#333',
    marginTop: 2,
  },

  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addedBy: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },

  viewDocBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  viewDocText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#888',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  closeBtn: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
})
