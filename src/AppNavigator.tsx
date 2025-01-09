import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthContext';
import LoginScreen from './screens/LoginScreen';
import TodoListScreen from './screens/TodoListScreen';
import TodoFormScreen from './screens/TodoFormScreen';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { user } = auth;

    if (user === undefined) {
        // Show loading spinner until user is determined
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={70} color="blue" />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="TodoList"
                        component={TodoListScreen}
                    />
                    <Stack.Screen
                        name="TodoForm"
                        options={{ headerTintColor: 'red' }}
                        component={TodoFormScreen}
                    />
                </>
            ) : (
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginScreen}
                />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
