// components/RoomGrid.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const roomData = [
    { id: '1', roomNo: '101', type: 'Deluxe Room', color: '#4CAF50' },
    { id: '2', roomNo: '102', type: 'Super Deluxe', color: '#F44336' },
    { id: '3', roomNo: '103', type: 'Deluxe Room', color: '#2196F3' },
    { id: '4', roomNo: '104', type: 'Economy Room', color: '#9C27B0' },
    { id: '5', roomNo: '105', type: 'Deluxe Room', color: '#424242' },
    { id: '6', roomNo: '106', type: 'Super Deluxe', color: '#795548' },
    { id: '7', roomNo: '107', type: 'Super Deluxe', color: '#e2bf8b' },
    { id: '8', roomNo: '108', type: 'Super Deluxe', color: '#e2bf8b' },
    { id: '9', roomNo: '109', type: 'Super Deluxe', color: '#795548' },
    { id: '10', roomNo: '110', type: 'Super Deluxe', color: '#795548' },


];

const RoomGrid = () => {
    const renderItem = ({ item }) => (
        <View style={[styles.card, { backgroundColor: item.color }]}>
            <View style={styles.overlay}>
                <Text style={styles.roomNo}>{item.roomNo}</Text>
                <Text style={styles.roomType}>{item.type}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={roomData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.row}   // spacing between two cards
        />
    );
};

export default RoomGrid;

const styles = StyleSheet.create({
    list: {
        paddingVertical: 16,
    },
    row: {
        gap: 12,            // space between cards horizontally
        marginBottom: 12,  // space between rows
    },
    card: {
        flex: 1,
        borderRadius: 14,
        height: 110,
        overflow: 'hidden'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roomNo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    roomType: {
        fontSize: 13,
        color: '#f1f1f1',
        marginTop: 4,
    },
});
