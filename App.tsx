import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/login/LoginScreen";
import RegisterScreen from "./src/app/RegisterScreen";
import HomeScreen from "./src/app/HomeScreen";
import CartScreen from "./src/app/CartScreen";
import ProductDetailScreen from "./src/app/ProductDetailScreen";
import { UserProvider } from "./src/context/UserContext";

type RootStackParamList = {
  Login: undefined;
  Register: { referral?: string };
  Home: { name: string; cart?: any[] };
  Cart: { cart: any[] };
  ProductDetail: { id: number; name: string; images: any[]; price: string; description: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register" }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Welcome" }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Cart" }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Product Details" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;