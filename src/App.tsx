import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext';
import AppNavigator from './AppNavigator';
import { TodoProvider } from './TodoContext';


const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;

