import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'

const TravelAgent = () => {
  return (
   
    <SafeAreaView style={styles.container}>
        <Header/>
    </SafeAreaView>
  )
}

export default TravelAgent

const styles = StyleSheet.create({
     container:{
        flex:1,
        paddingHorizontal:16
    }
})