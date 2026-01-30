import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchExpenseData, resetExpenseStatus } from '../../redux/features/Dashboard/ExpenseSlice';
import { format } from 'date-fns'
import LinearGradient from 'react-native-linear-gradient';

const AddExpense = () => {
  const { loading, success, error } = useSelector((state) => state.expense);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [date, setDate] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [mode, setMode] = useState('');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);


  const dispatch = useDispatch();

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (!result.didCancel && result.assets) {
      setImage(result.assets[0]);
    }
  };
useEffect(() => {
  if (success) {
    setModalVisible(false);

    setDate("");
    setExpenseName("");
    setMode("");
    setPrice("");
    setDescription("");
    setImage(null);

    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const from_date = format(oneWeekAgo, 'yyyy-MM-dd');
    const to_date = format(today, 'yyyy-MM-dd');

    dispatch(fetchExpenseData({ from_date, to_date }));

    dispatch(resetExpenseStatus());
  }
}, [success]);

  const submitExpense = () => {
    if (!date || !expenseName || !mode || !price) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();

    // date WITH time (important)
    formData.append(
      "expense_date",date);
    formData.append("name", expenseName);
    formData.append("payment_mode", mode);
    formData.append("price", price);
    formData.append("description", description);

    if (image) {
      formData.append("docs[]", image.uri);
    }

    dispatch(addExpense(formData));
  };
  const closeModal = () => {
  setModalVisible(false);
  setCalendarVisible(false);
  setShowModeDropdown(false);

  setDate("");
  setExpenseName("");
  setMode("");
  setPrice("");
  setDescription("");
  setImage(null);
};


  return (
    <View style={styles.container}>
      {/* Add Expense Button */}
      <TouchableOpacity
       
        onPress={() => setModalVisible(true)}>
           <LinearGradient
                        colors={['#7F00FF', '#d15eee']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                       style={styles.addBtn}
                      >
        <Text style={styles.btnText}>Add Expense</Text>
                      </LinearGradient>
      </TouchableOpacity>

      {/* Bottom Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>

              {/* Date Picker */}
              <TouchableOpacity
                style={styles.input}
                onPress={() => setCalendarVisible(true)}>
                <Text>{date ? date : 'Select Expense Date'}</Text>
              </TouchableOpacity>

              {/* Calendar Modal */}
              <Modal visible={calendarVisible} transparent>
                <View style={styles.calendarContainer}>
                  <View style={styles.calendarBox}>
                   <CalendarPicker
  onDateChange={(selectedDate) => {
    const now = new Date();

    const datePart = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    const timePart = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const finalDateTime = `${datePart}T${timePart}`;

    setDate(finalDateTime);
    setCalendarVisible(false);
  }}
/>

                  </View>
                </View>
              </Modal>

              {/* Expense Name */}
              <TextInput
                style={styles.input}
                placeholder="Expense Name"
                value={expenseName}
                onChangeText={setExpenseName}
              />

              {/* Mode Dropdown */}
              <TouchableOpacity
                style={styles.inputRow}
                onPress={() => setShowModeDropdown(!showModeDropdown)}>
                <Text>{mode ? mode : 'Select Mode'}</Text>
                <Icon name="chevron-down" size={20} />
              </TouchableOpacity>

              {showModeDropdown && (
                <View style={styles.dropdown}>
                  <TouchableOpacity onPress={() => { setMode('Cash'); setShowModeDropdown(false); }}>
                    <Text style={styles.dropdownItem}>Cash</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setMode('Online'); setShowModeDropdown(false); }}>
                    <Text style={styles.dropdownItem}>Online</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Price */}
              <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />

              {/* Description */}
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholder="Description"
                multiline
                value={description}
                onChangeText={setDescription}
              />

              {/* Image Picker */}
              <TouchableOpacity style={styles.imageBtn} onPress={openGallery}>
                <Text>Select Image</Text>
              </TouchableOpacity>

              {image && (
                <Image source={{ uri: image.uri }} style={styles.image} />
              )}

              {/* Submit */}
              <TouchableOpacity style={styles.submitBtn} onPress={submitExpense}>
                <Text style={styles.submitText}>Submit Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={closeModal}>
  <Text style={styles.cancelText}>Cancel</Text>
</TouchableOpacity>

               
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  
  addBtn: {
    // backgroundColor: '#7F00FF',
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  dropdownItem: {
    padding: 10,
  },
  imageBtn: {
    borderWidth: 1,
    borderColor: '#7F00FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
  submitBtn: {
    backgroundColor: '#7F00FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  cancelBtn: {
  borderWidth: 1,
  borderColor: '#7F00FF',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 10,
},

cancelText: {
  color: '#7F00FF',
  fontWeight: 'bold',
}
});
