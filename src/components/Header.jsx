import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute(); // 👈 current screen info
  const [menuVisible, setMenuVisible] = useState(false);

  const getToday = () => {
    const today = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return today.toLocaleDateString('en-GB', options);
  };

  // Screen name → Header title mapping
  const screenTitles = {
    PropertyHome: 'Dashboard',
    RoomStatus: 'Room Status',
   
    Expense: 'Expense',
    Iteminventory: 'Items Inventory',
    staff: 'Staff',
    TravelAgent: 'Travel Agent Account',
    AccountSummary: 'Account Summary',
    reports: 'Reports',
    appearance: 'Appearance',
    GuestDetail: 'Guest Details',
    activityLogs: 'Activity Logs',
    notification: 'Notifications',
  };

  const currentTitle = screenTitles[route.name] || route.name;

  const menuItems = [
    { name: 'Dashboard', route: 'PropertyHome' },
 
  
    { name: 'Expense', route: 'Expense' },
    { name: 'Items Inventory', route: 'Iteminventory' },
    { name: 'Staff', route: 'staff' },
    { name: 'Travel Agent Account', route: 'TravelAgent' },
    { name: 'Account Summary', route: 'AccountSummary' },
    { name: 'Reports', route: 'reports' },
    { name: 'Appearance', route: 'appearance' },
    { name: 'Guest Details', route: 'GuestDetail' },
    { name: 'Activity Logs', route: 'activityLogs' },
  ];

  // Icon mapping based on NAME
  const getIconByName = (name) => {
    switch (name.toLowerCase()) {
      case 'dashboard':
        return { type: 'Ionicons', icon: 'home-outline' };
      case 'room status':
        return { type: 'Fontisto', icon: 'hotel' };
      case 'create booking':
        return { type: 'FontAwesome5', icon: 'book' };
      case 'expense':
        return { type: 'MaterialIcons', icon: 'meeting-room' };
      case 'items inventory':
        return { type: 'Ionicons', icon: 'cube-outline' };
      case 'staff':
        return { type: 'Ionicons', icon: 'people-outline' };
      case 'travel agent account':
        return { type: 'FontAwesome5', icon: 'ticket-alt' };
      case 'account summary':
        return { type: 'MaterialIcons', icon: 'account-balance-wallet' };
      case 'reports':
        return { type: 'MaterialIcons', icon: 'receipt' };
      case 'appearance':
        return { type: 'Ionicons', icon: 'color-palette-outline' };
      case 'guest details':
        return { type: 'Ionicons', icon: 'person-outline' };
      case 'activity logs':
        return { type: 'MaterialIcons', icon: 'history' };
      default:
        return { type: 'Ionicons', icon: 'help-circle-outline' };
    }
  };

  // Render correct icon library
  const renderIcon = (name) => {
    const { type, icon } = getIconByName(name);

    switch (type) {
      case 'Ionicons':
        return <Icon name={icon} size={22} color="#444" />;
      case 'Fontisto':
        return <Fontisto name={icon} size={20} color="#444" />;
      case 'FontAwesome5':
        return <FontAwesome5 name={icon} size={20} color="#444" />;
      case 'MaterialIcons':
        return <MaterialIcons name={icon} size={22} color="#444" />;
      default:
        return null;
    }
  };

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{currentTitle}</Text>
          <Text style={styles.date}>{getToday()}</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => navigation.navigate('notification')}
          >
            <Icon name="notifications-outline" size={22} color="#444" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBox}
            onPress={() => setMenuVisible(true)}
          >
            <Icon name="menu" size={22} color="#444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Drawer Modal */}
      <Modal visible={menuVisible} transparent animationType="fade">
        {/* Overlay */}
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        />

        {/* Drawer */}
        <ScrollView style={styles.drawer}>
          <Text style={styles.menuHeader}>Staff</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate(item.route);
              }}
            >
              {renderIcon(item.name)}
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
  },

  date: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '70%',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    elevation: 10,
  },

  menuHeader: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.4,
    borderColor: '#ccc',
  },

  menuText: {
    fontSize: 18,
    color: '#111',
  },
});
