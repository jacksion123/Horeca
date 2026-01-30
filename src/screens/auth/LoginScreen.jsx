import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { wp, hp, fs } from '../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../redux/features/authuser/AuthSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.auth);

  // Username & Password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // User Role
  const [userType, setUserType] = useState('staff'); // staff | partner
const handleLogin = () => {
  if (!username || !password) {
    Alert.alert('Error', 'Please enter both Username and Password');
    return;
  }
  console.log({username,password});
  
  dispatch(
    loginUser({
      username,
      password
    })
  );
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
            source={{ uri: 'https://horecaguardian.com/assets/logo/horeca-logo.jpg' }}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.title}>LOGIN PANEL</Text>
          <Text style={styles.subtitle}>
            {userType === 'staff' ? 'Staff Login' : 'Partner Login'}
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Role Switch */}
          <View style={styles.roleSwitch}>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                userType === 'staff' && styles.activeRole,
              ]}
              onPress={() => setUserType('staff')}
            >
              <Icon
                name="people-outline"
                size={fs(18)}
                color={userType === 'staff' ? '#fff' : '#555'}
              />
              <Text
                style={[
                  styles.roleText,
                  userType === 'staff' && styles.activeRoleText,
                ]}
              >
                Staff
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleBtn,
                userType === 'partner' && styles.activeRole,
              ]}
             onPress={() => navigation.navigate('partnerLogin')}

            >
              <Icon
                name="briefcase-outline"
                size={fs(18)}
                color={userType === 'partner' ? '#fff' : '#555'}
              />
              <Text
                style={[
                  styles.roleText,
                  userType === 'partner' && styles.activeRoleText,
                ]}
              >
                Partner
              </Text>
            </TouchableOpacity>
          </View>

          {/* Username Input */}
          <View style={styles.inputWrapper}>
            <Icon name="person-outline" size={fs(20)} color="#333" />
            <TextInput
              style={[styles.input, { marginLeft: wp(10) }]}
              placeholder="Username"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={fs(20)} color="#333" />
            <TextInput
              style={[styles.input, { marginLeft: wp(10) }]}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity disabled={loading} onPress={handleLogin}>
            <LinearGradient
              colors={['#7F00FF', '#d15eee']}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  SIGN IN 
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: { flex: 1 },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(20),
    backgroundColor: 'rgba(0,0,0,0.)',
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
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: fs(15),
    color: '#f0f0f0',
    fontWeight: '700',
    marginTop: hp(5),
  },

  card: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 450,
    borderRadius: wp(25),
    padding: wp(25),
  },

  /* Role Switch */
  roleSwitch: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: wp(25),
    marginBottom: hp(18),
    overflow: 'hidden',
  },

  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(10),
    gap: wp(6),
  },

  activeRole: {
    backgroundColor: '#7F00FF',
  },

  roleText: {
    fontSize: fs(14),
    color: '#555',
    fontWeight: '600',
  },

  activeRoleText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* Inputs */
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
    paddingLeft: wp(10),
    fontSize: fs(16),
    color: '#000',
  },

  /* Button */
  button: {
    paddingVertical: hp(12),
    borderRadius: wp(25),
    alignItems: 'center',
    marginTop: hp(5),
  },

  buttonText: {
    color: '#fff',
    fontSize: fs(16),
    fontWeight: '700',
  },
});
