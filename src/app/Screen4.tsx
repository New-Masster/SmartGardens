import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Screen4: { id: number; nome: string; imagens: any[]; preco: string; descricao: string };
};

type Screen4Props = {
  navigation: StackNavigationProp<RootStackParamList, "Screen4">;
  route: RouteProp<RootStackParamList, "Screen4">;
};

const Screen4: React.FC<Screen4Props> = ({ navigation, route }) => {
  const { nome, imagens, preco, descricao } = route.params;
  const [imagemIndex, setImagemIndex] = useState(0);

  const handleNextImage = () => {
    setImagemIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  };

  const handlePrevImage = () => {
    setImagemIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handlePrevImage}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Image source={imagens[imagemIndex]} style={styles.productImage} />
        <TouchableOpacity onPress={handleNextImage}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{nome}</Text>
      <Text style={styles.productPrice}>{preco}</Text>
      <Text style={styles.productDescription}>{descricao}</Text>

      <TouchableOpacity style={styles.button} onPress={() => alert("Produto adicionado ao carrinho!")}>
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  arrow: {
    fontSize: 24,
    color: "#1E90FF",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 20,
    color: "#1E90FF",
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
});

export default Screen4;