import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/login/index";
import Screen1 from "./src/app/Screen1";
import Screen2 from "./src/app/Screen2";
import Screen3 from "./src/app/Screen3";
import Screen4 from "./src/app/Screen4";
import { UserProvider } from "./src/context/UserContext"; // Importando o UserProvider

type RootStackParamList = {
  Login: undefined;
  Screen1: { referral?: string };
  Screen2: { nome: string; carrinho?: any[] };
  Screen3: { carrinho: any[] };
  Screen4: { id: number; nome: string; imagens: any[]; preco: string; descricao: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <UserProvider> {/* Envolvendo o aplicativo com o UserProvider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Screen1" component={Screen1} options={{ title: "Cadastro" }} />
          <Stack.Screen name="Screen2" component={Screen2} options={{ title: "Bem-vindo" }} />
          <Stack.Screen name="Screen3" component={Screen3} options={{ title: "Lista de Produtos" }} />
          <Stack.Screen name="Screen4" component={Screen4} options={{ title: "Detalhes do Produto" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

// Configuração completa do sistema de navegação com Stack.Navigator.
// Tipagem para parâmetros de navegação.
// Definição da tela inicial (Login).
// Envolvendo o aplicativo com o UserProvider para gerenciar o contexto global.