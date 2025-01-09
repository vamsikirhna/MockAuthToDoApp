import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    user: string | null | undefined; // Include undefined
    login: (username: string) => Promise<void>;
    logout: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null | undefined>(undefined);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            setUser(storedUser || null);
        };
        loadUser();
    }, []);

    // Load user from AsyncStorage on app start
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error('Failed to load user from AsyncStorage:', error);
            }
        };
        loadUser();
    }, []);

    // Log in the user and store their username in AsyncStorage
    const login = async (username: string) => {
        try {
            await AsyncStorage.setItem('user', username);
            setUser(username);
        } catch (error) {
            console.error('Failed to save user to AsyncStorage:', error);
        }
    };

    // Log out the user and remove their username from AsyncStorage
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (error) {
            console.error('Failed to remove user from AsyncStorage:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
