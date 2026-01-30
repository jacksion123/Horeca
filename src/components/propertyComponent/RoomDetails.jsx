// components/RoomDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const legendData = [
  { label: 'Available', color: '#4CAF50' },
  { label: 'Booked', color: '#F44336' },
  { label: 'Checked In', color: '#2196F3' },
  { label: 'Checkout Today', color: '#e2bf8b' },
  { label: 'Housekeeping', color: '#9C27B0' },
  { label: 'DND', color: '#424242' },
  { label: 'Maintenance', color: '#795548' },
];

const RoomDetails = () => {
  return (
    <View style={styles.container}>
      {legendData.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.text}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default RoomDetails;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius:16,
    marginBottom:20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginVertical: 5,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
});
