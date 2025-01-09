import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LoginScreen = () => {
    const { login }: any = useContext(AuthContext);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleLogin = (values: { username: string; password: string }) => {
        login(values.username);
    };

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>

                    {/* Username Field */}
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        placeholderTextColor="#666"
                    />
                    {touched.username && errors.username && (
                        <Text style={styles.error}>{errors.username}</Text>
                    )}

                    {/* Password Field with Toggle Visibility */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            secureTextEntry={!isPasswordVisible}
                            placeholderTextColor="#666"
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!isPasswordVisible)}
                        >
                            <Icon
                                name={isPasswordVisible ? 'eye' : 'eye-off'}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}

                    {/* Login Button */}
                    <Button title="Login" onPress={handleSubmit as any} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginBottom: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    passwordInput: {
        flex: 1,
        padding: 8,
    },
    error: {
        color: 'red',
        marginBottom: 8,
        fontSize: 12,
    },
});

export default LoginScreen;
