import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Screen3: undefined;
  Screen4: { id: number; nome: string; imagens: string[]; preco: string; descricao: string };
};

type Screen3Props = {
  navigation: StackNavigationProp<RootStackParamList, "Screen3">;
};

// Importando as imagens dos produtos
const bancadaHidroponica = [
  require('../assets/Bancada Hidropônica 0.png'),
  require('../assets/Bancada Hidropônica 1.png'),
  require('../assets/Bancada Hidropônica 2.png')
];
const caixaHidroponica = [
  require('../assets/Caixa Hidropônica 0.png'),
  require('../assets/Caixa Hidropônica 1.png'),
  require('../assets/Caixa Hidropônica 2.png')
];
const hortaHidroponica = [
  require('../assets/Horta Hidropônica 0.png'),
  require('../assets/Horta Hidropônica 1.png'),
  require('../assets/Horta Hidropônica 2.png')
];

const produtos = [
  { id: 1, nome: "Bancada Hidropônica", imagens: bancadaHidroponica, preco: "R$ 687,00", descricao: "Uma linda planta suculenta para decorar seu espaço." },
  { id: 2, nome: "Caixa Hidropônica", imagens: caixaHidroponica, preco: "R$ 302,99", descricao: "Ideal para purificar o ar e decorar ambientes internos." },
  { id: 3, nome: "Horta Hidropônica", imagens: hortaHidroponica, preco: "R$ 59,90", descricao: "Orquídea elegante para dar um toque especial à decoração." }
];

const Screen3: React.FC<Screen3Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate("Screen4", item)}>
            <Image source={item.imagens[0]} style={styles.productImage} />
            <View style={styles.textContainer}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productPrice}>{item.preco}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#1E90FF",
    marginTop: 5,
  },
});

export default Screen3;