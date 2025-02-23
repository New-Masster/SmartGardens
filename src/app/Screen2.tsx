import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Screen2: { nome: string };
  Screen3: undefined;
  Login: undefined;
};

type Screen2Props = {
  navigation: StackNavigationProp<RootStackParamList, "Screen2">;
  route: RouteProp<RootStackParamList, "Screen2">;
};

const Screen2: React.FC<Screen2Props> = ({ navigation, route }) => {
  const nome = route.params?.nome ?? "Usuário";  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Olá, {nome}!</Text>
          <Text style={styles.subtitle}>Seja bem-vindo(a)!</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image source={require("../assets/Usuario.png")} style={styles.profileImage} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.logoutContainer}>
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>Produtos em Ambientes Diferentes</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.productImage} />
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.productImage} />
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.productImage} />
      </View>

      {/* Novo botão para ir para a Screen3 */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Screen3")}>
        <Text style={styles.buttonText}>Ir para a próxima etapa</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  welcomeContainer: {
    flexDirection: "column",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  profileContainer: {
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  logoutContainer: {
    position: "absolute",
    bottom: -20,
    left: "50%",
    transform: [{ translateX: -10 }],
  },
  logout: {
    fontSize: 16,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  productImage: {
    width: 150,
    height: 150,
    margin: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Screen2;
