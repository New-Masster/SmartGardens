// Screen3.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Screen2: { nome: string };
  Screen3: { carrinho: any[] };  // Passando o carrinho como parâmetro
  Login: undefined;
  Screen4: { id: number; nome: string; imagens: string[]; preco: string; descricao: string };
};

type Screen3Props = {
  navigation: StackNavigationProp<RootStackParamList, "Screen3">;
  route: RouteProp<RootStackParamList, "Screen3">;
};

const Screen3: React.FC<Screen3Props> = ({ route }) => {
  const carrinho = route.params?.carrinho ?? [];

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + parseFloat(item.preco.replace("R$", "").replace(",", ".")) * item.quantidade, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho de Compras</Text>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemPrice}>{item.preco}</Text>
            <Text style={styles.itemQuantity}>Quantidade: {item.quantidade}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {calcularTotal().toFixed(2).replace(".", ",")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  itemContainer: { marginBottom: 20, alignItems: "center" },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPrice: { fontSize: 16, color: "#1E90FF" },
  itemQuantity: { fontSize: 16, color: "#006400" },
  total: { fontSize: 20, fontWeight: "bold", marginTop: 20 }
});

export default Screen3;
