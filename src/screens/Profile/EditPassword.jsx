import {

    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';

import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/features/Profile/editPassword';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
// import { TextInput } from 'react-native-gesture-handler';

const EditPassword = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { loading } = useSelector(state => state.editPassword);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconWrapper}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Password</Text>
                <View style={styles.rightSpacer} />
            </View>
            <View style={{ padding: 16 }}>
                {/* Old Password */}
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>
                        Old Password
                    </Text>
                    <TextInput
                        placeholder="Enter old password"
                        secureTextEntry
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        style={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#d1d5db',
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                            fontSize: 16,
                            color: '#111827',
                        }}
                    />
                </View>

                {/* New Password */}
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>
                        New Password
                    </Text>
                    <TextInput
                        placeholder="Enter new password"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#d1d5db',
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                            fontSize: 16,
                            color: '#111827',
                        }}
                    />
                </View>

                {/* Confirm Password */}
                <View style={{ marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>
                        Confirm Password
                    </Text>
                    <TextInput
                        placeholder="Confirm new password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={{
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#d1d5db',
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                            fontSize: 16,
                            color: '#111827',
                        }}
                    />
                </View>

                <LinearGradient
                    colors={['#7F00FF', '#d15eee']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                >
                    <TouchableOpacity
                        disabled={loading}
                        onPress={() =>
                            dispatch(
                                updatePassword({
                                    old_password: oldPassword,
                                    new_password: newPassword,
                                    confirm_password: confirmPassword,
                                })
                            )
                        }
                        style={styles.buttonInner}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
        </SafeAreaView>

    )
}

export default EditPassword
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e6e8f5" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
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

    /* 🔥 Gradient Button Styles */
    gradientButton: {
        borderRadius: 8,
        marginTop: 10,
    },

    buttonInner: {
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 8,
        opacity: 1,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
