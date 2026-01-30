// component/ProfileComponents/UserCard.js
import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";

const UserCard = () => {
  const { profile, loading, error } = useSelector(state => state.profile);
  // console.log(profile);


  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarWrap}>
        <Image source={require('../../assets/pro.webp')} style={styles.avatar} />
      </View>
      <Text style={styles.name}>{profile?.name}</Text>
      <Text style={styles.email}>+91 {profile?.mobile_no}</Text>
       <Text style={styles.email}>{profile?.email_id}</Text>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  profileCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "white",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#111827" },
  email: { fontSize: 14, color: "#6b7280", marginTop: 4 },
});
