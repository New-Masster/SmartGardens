import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/login/index";
import Screen1 from "./src/app/Screen1";
import Screen2 from "./src/app/Screen2";


type RootStackParamList = {
  Login: undefined;
  Screen1: { referral?: string };
  Screen2: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Screen1" component={Screen1} options={{ title: "Cadastro" }} />
        <Stack.Screen name="Screen2" component={Screen2} options={{ title: "Bem-vindo" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
