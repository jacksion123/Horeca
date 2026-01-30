// src/screens/Profile/ProfileScreen.js
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import UserCard from '../../components/profileComponents/UserCard'
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/authuser/AuthSlice";
import { fetchProfileData } from "../../redux/features/Profile/profile";
const ProfileScreen = () => {

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchProfileData());
  },[])

  const navigation = useNavigation();
  const handleLogout = async() => {
    await dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconWrapper}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.rightSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <UserCard />
        <View style={styles.optionCard}>
          <Option
            icon="edit"
            label="Edit Password"
            onPress={() => navigation.navigate('Editpassword')}
          />
          <Option icon="notifications" label="Notifications" />
          {/* <Option icon="hotel" label="Hotel Booking" onPress={()=>{}}/> */}
        
          {/* <Option icon="star-rate" label="Interest Show" /> */}
          {/* <Option icon="language" label="Language" /> */}
          <Option icon="help-outline" label="Help Centre" onPress={()=> navigation.navigate('HelpCentre')} />
          <Option icon="privacy-tip" label="Privacy" />
          <Option icon="star-rate" label="Reviews" onPress={() => navigation.navigate('Reviews')}/>
          <Option icon="logout" label="Logout" danger onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Option = ({ icon, label, trailing, danger, onPress }) => (
  <TouchableOpacity
    style={styles.optionRow}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.optionLeft}>
      <MaterialIcons
        name={icon}
        size={22}
        color={danger ? "#e11d48" : "#374151"}
      />
      <Text style={[styles.optionLabel, danger && { color: "#e11d48" }]}>
        {label}
      </Text>
    </View>
    <View>
      {trailing ? (
        trailing
      ) : (
        <MaterialIcons name="chevron-right" size={22} color="#9ca3af" />
      )}
    </View>
  </TouchableOpacity>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e6e8f5' },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    flex: 1,
  },
  iconWrapper: { width: 40, justifyContent: "center", alignItems: "center" },
  rightSpacer: { width: 40 },
  scrollContent: { padding: 10 },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  optionLeft: { flexDirection: "row", alignItems: "center" },
  optionLabel: { fontSize: 16, marginLeft: 12, color: "#111827" },
});
