import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import ActivityLogSection from '../../components/propertyComponent/ActivityLogSection'
const ActivityLogs = () => {
  return (
   <SafeAreaView style={styles.container}>
    <Header/>
     <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        ListHeaderComponent={
          <>
           <ActivityLogSection/>
          </>
        }
      />
   </SafeAreaView>
  )
}

export default ActivityLogs

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:16,
        backgroundColor: '#e6e8f5'
    }
})