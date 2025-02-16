import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoScreen from './src/login'; // Caminho para a tela de login

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LogoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
