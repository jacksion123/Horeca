import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import RoomDetails from '../../components/propertyComponent/RoomDetails'
import RoomGrid from '../../components/propertyComponent/RoomGrid'
import { hp } from '../../utils/responsive'
const RoomStatus = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        ListHeaderComponent={
          <>
            <RoomDetails />
            <RoomGrid />
          </>
        }
      />
    </SafeAreaView>
  )
}

export default RoomStatus

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#e6e8f5'
  }
})