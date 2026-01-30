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
import { fetchHotelBills, fetchInvoiceByLink } from '../../redux/features/Dashboard/BillSlice'
import LinearGradient from 'react-native-linear-gradient'

const BillsSection = () => {
    const dispatch = useDispatch()
    const { data, loading } = useSelector(state => state.bills)

    const bills = data?.bills || []

    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)

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

        dispatch(fetchHotelBills({ from_date, to_date }))
    }

    useEffect(() => {
  const today = new Date()
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(today.getDate() - 15)

  setCheckOut(today)
  setCheckIn(oneWeekAgo)

  const from_date = format(oneWeekAgo, 'yyyy-MM-dd')
  const to_date = format(today, 'yyyy-MM-dd')

  // Auto load expenses for last 7 days
  dispatch(fetchHotelBills({ from_date, to_date }))
}, [])


    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.billNo}>{item.bill_no}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Mobile:</Text>
                <Text style={styles.value}>{item.mobile_no}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Room No:</Text>
                <Text style={styles.value}>{item.room_no}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Persons:</Text>
                <Text style={styles.value}>{item.no_of_person}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Booking:</Text>
                <Text style={styles.value}>{item.booking_time}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Checkout:</Text>
                <Text style={styles.value}>{item.checkout_time}</Text>
            </View>

            <View style={styles.amountBox}>
                <Text style={styles.amountText}>Amount: ₹ {item.amount}</Text>
                <Text style={styles.paidText}>Paid: ₹ {item.paid_amt}</Text>
                <Text style={styles.gstText}>GST: {item.gst}%</Text>
            </View>

            <TouchableOpacity
                onPress={() => dispatch(fetchInvoiceByLink({ bill_link: item.bill_link }))}
            >
                <LinearGradient
                    colors={['#7F00FF', '#d15eee']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.invoiceBtn}
                >
                    <Text style={styles.invoiceText}>View Invoice</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Hotel Bills</Text>

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

            <Modal
                visible={showCalendar}
                transparent
                animationType="none"
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

            <TouchableOpacity activeOpacity={0.8} onPress={handleSearch}>
                <LinearGradient
                    colors={['#7F00FF', '#d15eee']}   
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.searchBtn}
                >
                    <Text style={styles.searchText}>Search Bills</Text>
                </LinearGradient>
            </TouchableOpacity>


            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={bills}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCard}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No bills found</Text>
                    }
                />
            )}
        </SafeAreaView>
    )
}

export default BillsSection
const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 12,
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
        letterSpacing: 0.5,
    },

    searchText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },

    card: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        marginVertical: 8,
        // elevation: 2,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    name: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2c3e50',
    },

    billNo: {
        fontSize: 12,
        color: '#555',
        fontWeight: '600',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2,
    },

    label: {
        fontSize: 13,
        color: '#555',
    },

    value: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
    },

    amountBox: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#f1f8ff',
        borderRadius: 6,
    },

    amountText: {
        fontWeight: '700',
        color: '#27ae60',
    },

    paidText: {
        fontWeight: '700',
        color: '#2c3e50',
    },

    gstText: {
        fontWeight: '600',
        color: '#555',
    },

    invoiceBtn: {
        marginTop: 10,
        backgroundColor: '#27ae60',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },

    invoiceText: {
        color: '#fff',
        fontWeight: '600',
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        color: '#888',
    },

    /* Modal styles */
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
