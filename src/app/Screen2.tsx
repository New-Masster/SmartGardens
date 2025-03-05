import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Button } from 'react-native-elements';

type RootStackParamList = {
  Screen2: { nome: string, carrinho?: any[] };
  Screen3: { carrinho: any[] };
  Login: undefined;
  Screen4: { id: number; nome: string; imagens: string[]; preco: string; descricao: string };
};

type Screen2Props = {
  navigation: StackNavigationProp<RootStackParamList, "Screen2">;
  route: RouteProp<RootStackParamList, "Screen2">;
};

const Screen2: React.FC<Screen2Props> = ({ navigation, route }) => {
  const nome = route.params?.nome ?? "Usuário";
  const [selectedImageIndexes, setSelectedImageIndexes] = useState<{ [key: number]: number }>({});
  const [quantidades, setQuantidades] = useState<{ [key: number]: number }>({});
  const [carrinho, setCarrinho] = useState<any[]>(route.params?.carrinho ?? []);

  useEffect(() => {
    if (route.params?.carrinho) {
      setCarrinho(route.params.carrinho);
    }
  }, [route.params?.carrinho]);

  const produtos = [
    { id: 1, nome: "Bancada Hidropônica", imagens: [require("../assets/Bancada Hidropônica 0.png"), require("../assets/Bancada Hidropônica 1.png"), require("../assets/Bancada Hidropônica 2.png")], preco: "R$ 687,00", descricao: "Uma linda planta suculenta para decorar seu espaço." },
    { id: 2, nome: "Caixa Hidropônica", imagens: [require("../assets/Caixa Hidropônica 0.png"), require("../assets/Caixa Hidropônica 1.png"), require("../assets/Caixa Hidropônica 2.png")], preco: "R$ 302,99", descricao: "Ideal para purificar o ar e decorar ambientes internos." },
    { id: 3, nome: "Horta Hidropônica", imagens: [require("../assets/Horta Hidropônica 0.png"), require("../assets/Horta Hidropônica 1.png"), require("../assets/Horta Hidropônica 2.png")], preco: "R$ 59,90", descricao: "Orquídea elegante para dar um toque especial à decoração." }
  ];

  const handleImageChange = (productId: number, index: number, images: any[]) => {
    setSelectedImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId]: (index + images.length) % images.length,
    }));
  };

  const alterarQuantidade = (id: number, incremento: number) => {
    setQuantidades((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + incremento),
    }));
  };

  const adicionarAoCarrinho = (produtoId: number) => {
    const produto = produtos.find(p => p.id === produtoId);
    if (produto) {
      setCarrinho((prevCarrinho) => {
        const itemExistente = prevCarrinho.find(item => item.id === produtoId);
        if (itemExistente) {
          return prevCarrinho.map(item =>
            item.id === produtoId
              ? { ...item, quantidade: item.quantidade + (quantidades[produtoId] || 1) }
              : item
          );
        } else {
          return [...prevCarrinho, { ...produto, quantidade: quantidades[produtoId] || 1 }];
        }
      });
    }
  };

  return (
    <ImageBackground source={require("../assets/Fundo_usuario.png")} style={styles.background} imageStyle={{ opacity: 0.7 }}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Olá, {nome}!</Text>
          <Text style={styles.subtitle}>Seja bem-vindo(a)!</Text>
        </View>

        {/* Container do perfil e carrinho */}
        <View style={styles.profileContainer}>
          <View style={styles.iconContainer}>
            <Button icon={{ name: 'shopping-cart', color: '#FFF' }} buttonStyle={styles.iconButton} onPress={() => navigation.navigate("Screen3", { carrinho })} />
          </View>
          <Image source={require("../assets/Usuario.png")} style={styles.profileImage} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.logoutContainer}>
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.title}>Produtos</Text>
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productPrice}>{item.preco}</Text>
              <View style={styles.imageSliderContainer}>
                <TouchableOpacity onPress={() => handleImageChange(item.id, (selectedImageIndexes[item.id] || 0) - 1, item.imagens)}>
                  <Text style={styles.arrow}>{"<"}</Text>
                </TouchableOpacity>
                <Image source={item.imagens[selectedImageIndexes[item.id] || 0]} style={styles.productImage} />
                <TouchableOpacity onPress={() => handleImageChange(item.id, (selectedImageIndexes[item.id] || 0) + 1, item.imagens)}>
                  <Text style={styles.arrow}>{">"}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => alterarQuantidade(item.id, -1)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantidades[item.id] || 1}</Text>
                <TouchableOpacity onPress={() => alterarQuantidade(item.id, 1)} style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => adicionarAoCarrinho(item.id)} style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
          nestedScrollEnabled
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
    position: "absolute",
    top: 0,
    paddingHorizontal: 10,
  },
  welcomeContainer: { flexDirection: "column" },
  welcomeText: { fontSize: 18, fontWeight: "bold", color: "#006400" },
  subtitle: { fontSize: 14, color: "#006400" },
  profileContainer: { alignItems: "center", position: "relative", flexDirection: 'row'},
  iconContainer: { marginRight: 10 },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  logoutContainer: { position: "absolute", bottom: -20, left: "50%", transform: [{ translateX: -10 }] },
  logout: { fontSize: 16, color: "#006400", textDecorationLine: "underline" },
  iconButton: { backgroundColor: "#006400", padding: 10, borderRadius: 30 },
  iconText: { fontSize: 24, color: "#FFF" },
  productsContainer: { marginTop: 100, padding: 10, width: "100%" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  productContainer: { marginBottom: 40, alignItems: "center" },
  productName: { fontSize: 18, fontWeight: "bold", color: "#274200" },
  productPrice: { fontSize: 16, fontWeight: "bold", color: "#93f43d", marginVertical: 5 },
  imageSliderContainer: { flexDirection: "row", alignItems: "center" },
  arrow: { fontSize: 30, color: "#274200", marginHorizontal: 10 },
  productImage: { width: 200, height: 200, borderRadius: 10 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  quantityButton: { padding: 10, backgroundColor: "#ccc", borderRadius: 5 },
  quantityText: { fontSize: 18, fontWeight: "bold", color: "#274200" },
  quantityValue: { fontSize: 16, marginHorizontal: 10 },
  addToCartButton: { backgroundColor: "#006400", padding: 10, marginTop: 15, borderRadius: 5 },
  addToCartText: { color: "#FFF", fontSize: 16, fontWeight: "bold" }
});

export default Screen2;