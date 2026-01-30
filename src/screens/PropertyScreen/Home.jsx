import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import HeroSection from '../../components/propertyComponent/HeroSection'
import CurrentBooking from '../../components/propertyComponent/CurrentBooking'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeData } from '../../redux/features/Dashboard/HomeSlice'
import BillSection from '../../components/propertyComponent/BillsSection'

const Home = () => {
  const {data,loading,error} = useSelector(state => state.home)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchHomeData());
  },[])
  console.log(data);
  
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
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
            <HeroSection />
            <CurrentBooking />
            <BillSection/>
          </>
        }
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#e6e8f5'
  }
})