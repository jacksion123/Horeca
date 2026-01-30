import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import ExpenseSection from '../../components/propertyComponent/ExpenseSection'
import AddExpense from '../../components/propertyComponent/AddExpense'

const Expense = () => {
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
          {/* <AddExpense/> */}
          <ExpenseSection/> 
          </>
        }
      />
    </SafeAreaView>
  )
}

export default Expense
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:16,
        backgroundColor:'#e6e8f5'
    }
})