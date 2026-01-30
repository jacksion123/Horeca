import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import GuestSection from '../../components/propertyComponent/GuestSection'

const GuestDetails = () => {
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
            <GuestSection />
          </>
        }
      />

    </SafeAreaView>
  )
}

export default GuestDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#e6e8f5'
  }
})