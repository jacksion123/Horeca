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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp, hp, fs } from '../../utils/responsive';

const PartnerOtp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate OTP
  const handleGenerateOtp = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      Alert.alert('OTP Sent', 'OTP has been sent to your email');
    }, 1500);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    console.log({ email, otp });
    Alert.alert('Success', 'OTP verified successfully');
    navigation.replace('PartnerDashboard'); // Home Screen
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
        {/* Header */}
        <View style={styles.headerSection}>
          <Image
            source={{
              uri: 'https://horecaguardian.com/assets/logo/horeca-logo.jpg',
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>OTP LOGIN</Text>
          <Text style={styles.subtitle}>Verify your email to continue</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Email */}
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={fs(20)} color="#333" />
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {!otpSent ? (
            <TouchableOpacity onPress={handleGenerateOtp}>
              <LinearGradient colors={['#7F00FF', '#d15eee']} style={styles.button}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>GENERATE OTP</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <>
              {/* OTP */}
              <View style={styles.inputWrapper}>
                <Icon name="key-outline" size={fs(20)} color="#333" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={otp}
                  onChangeText={setOtp}
                />
              </View>

              <TouchableOpacity onPress={handleVerifyOtp}>
                <LinearGradient colors={['#7F00FF', '#d15eee']} style={styles.button}>
                  <Text style={styles.buttonText}>VERIFY OTP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Signin with Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PartnerOtp;

const styles = StyleSheet.create({
  background: { flex: 1 },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(20),
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  headerSection: {
    alignItems: 'center',
    marginBottom: hp(20),
  },

  logo: {
    width: wp(90),
    height: wp(90),
    borderRadius: wp(45),
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: hp(10),
  },

  title: {
    fontSize: fs(24),
    fontWeight: '800',
    color: '#fff',
  },

  subtitle: {
    fontSize: fs(14),
    color: '#f0f0f0',
    fontWeight: '600',
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: wp(25),
    padding: wp(25),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp(20),
    paddingHorizontal: wp(15),
    marginBottom: hp(14),
    height: hp(48),
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  input: {
    flex: 1,
    marginLeft: wp(10),
    fontSize: fs(16),
    color: '#000',
  },

  button: {
    paddingVertical: hp(12),
    borderRadius: wp(25),
    alignItems: 'center',
    marginTop: hp(10),
  },

  buttonText: {
    color: '#fff',
    fontSize: fs(15),
    fontWeight: '700',
  },

  backText: {
    marginTop: hp(15),
    textAlign: 'center',
    color: '#7F00FF',
    fontWeight: '700',
  },
});
