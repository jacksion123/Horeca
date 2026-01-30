import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, fs } from '../../utils/responsive';

const PartnerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Enter email and password');
      return;
    }

    console.log({ email, password, type: 'password' });
    Alert.alert('Success', 'Logged in with Email & Password');
    navigation.replace('PartnerDashboard');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1700639699341-ba1aa58154a3?q=80&w=464&auto=format&fit=crop',
      }}
      style={styles.background}
      blurRadius={2}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.overlay}>
        <View style={styles.headerSection}>
          <Image
            source={{ uri: 'https://horecaguardian.com/assets/logo/horeca-logo.jpg' }}
            style={styles.logo}
          />
          <Text style={styles.title}>PARTNER LOGIN</Text>
          <Text style={styles.subtitle}>Login to your partner account</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={fs(20)} color="#333" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={fs(20)} color="#333" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity onPress={handlePasswordLogin}>
            <LinearGradient colors={['#7F00FF', '#d15eee']} style={styles.button}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>LOGIN WITH PASSWORD</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.or}>OR</Text>

          <TouchableOpacity onPress={() => navigation.navigate('partnerOtp')}>
            <Text style={styles.otpText}>Sign in with OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PartnerLoginScreen;
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    paddingHorizontal: wp(18),
  },

  headerSection: {
    alignItems: 'center',
    marginBottom: hp(25),
  },

  logo: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    marginBottom: hp(10),
    backgroundColor: '#fff',
  },

  title: {
    fontSize: fs(22),
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: fs(13),
    color: '#ddd',
    marginTop: hp(4),
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: wp(22),
    padding: wp(18),
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: wp(30),
    paddingHorizontal: wp(15),
    height: hp(50),
    marginBottom: hp(15),
    borderWidth: 1,
    borderColor: '#ddd',
  },

  input: {
    flex: 1,
    marginLeft: wp(10),
    fontSize: fs(15),
    color: '#000',
  },

  button: {
    paddingVertical: hp(13),
    borderRadius: wp(30),
    alignItems: 'center',
    marginTop: hp(5),
  },

  buttonText: {
    color: '#fff',
    fontSize: fs(15),
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  or: {
    textAlign: 'center',
    marginVertical: hp(15),
    color: '#999',
    fontWeight: '600',
  },

  otpText: {
    textAlign: 'center',
    color: '#7F00FF',
    fontSize: fs(15),
    fontWeight: '700',
  },
});
