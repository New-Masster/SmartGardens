import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Screen3: { carrinho: any[] };
  Screen2: { carrinho: any[] };
  Payment: undefined;
};

type Screen3Props = {
  navigation: StackNavigationProp<RootStackParamList, "Screen3">;
  route: RouteProp<RootStackParamList, "Screen3">;
};

const Screen3: React.FC<Screen3Props> = ({ navigation, route }) => {
  const { userInfo } = useUser();
  const [carrinho, setCarrinho] = useState(route.params?.carrinho ?? []);

  useEffect(() => {
    navigation.setParams({ carrinho });
  }, [carrinho]);

  const calcularTotal = (preco: string, quantidade: number) => {
    const precoNumerico = parseFloat(preco.replace("R$", "").replace(",", "."));
    return (precoNumerico * quantidade).toFixed(2).replace(".", ",");
  };

  const calcularTotalGeral = () => {
    return carrinho
      .reduce((total, item) => {
        const precoNumerico = parseFloat(item.preco.replace("R$", "").replace(",", "."));
        return total + precoNumerico * item.quantidade;
      }, 0)
      .toFixed(2)
      .replace(".", ",");
  };

  const alterarQuantidade = (id: number, incremento: number) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map((item) =>
        item.id === id ? { ...item, quantidade: Math.max(1, item.quantidade + incremento) } : item
      )
    );
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter((item) => item.id !== id));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
            <Text style={styles.title}>Meu Carrinho</Text>
          </View>

          <Text style={styles.userName}>Olá, {userInfo.name || "Usuário"}!</Text>

          {carrinho.length > 0 ? (
            <>
              {carrinho.map((item) => (
                <View style={styles.productContainer} key={item.id}>
                  <Image source={item.imagens[0]} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.nome}</Text>
                    <Text style={styles.productPrice}>Preço Unitário: {item.preco}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => alterarQuantidade(item.id, -1)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityValue}>{item.quantidade}</Text>
                      <TouchableOpacity
                        onPress={() => alterarQuantidade(item.id, 1)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.productTotal}>
                      Total Parcial: R$ {calcularTotal(item.preco, item.quantidade)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removerDoCarrinho(item.id)}
                    style={styles.trashButton}
                  >
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total Geral: R$ {calcularTotalGeral()}</Text>
              </View>
              <TouchableOpacity style={styles.clearButton} onPress={limparCarrinho}>
                <FontAwesome name="trash" size={24} color="white" />
                <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => navigation.navigate("Payment")}
              >
                <FontAwesome name="credit-card" size={24} color="white" />
                <Text style={styles.paymentButtonText}>Realizar Pagamento</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Screen2", { carrinho })}
          >
            <FontAwesome name="arrow-left" size={24} color="white" />
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingBottom: 30, // Garante espaço extra no final
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#006400",
  },
  productContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274200",
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#274200",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    color: "#274200",
    fontWeight: "bold",
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274200",
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#274200",
    fontWeight: "bold",
  },
  productTotal: {
    fontSize: 16,
    color: "#385309",
    backgroundColor: "#6fdf90",
    borderRadius: 5,
    fontWeight: "bold",
  },
  trashButton: {
    marginLeft: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#385309",
    backgroundColor: "#6fdf90",
    borderRadius: 5,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  clearButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30, // Espaço extra para não ficar sobre os botões do sistema
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  paymentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 10,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Screen3;