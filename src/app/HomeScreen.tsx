import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { useUser } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Home: { name: string; cart?: any[] };
  Cart: { cart: any[] };
  Login: undefined;
  ProductDetail: { id: number; name: string; images: string[]; price: string; description: string };
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
  route: RouteProp<RootStackParamList, "Home">;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { userInfo, clearUserInfo } = useUser();
  const name = userInfo.name || "Usuário";
  const userPhoto = userInfo.photo;
  const [selectedImageIndexes, setSelectedImageIndexes] = useState<{ [key: number]: number }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cart, setCart] = useState<any[]>(route.params?.cart ?? []);

  useEffect(() => {
    if (route.params?.cart) {
      setCart(route.params.cart);
    }
  }, [route.params?.cart]);

  const products = [
    {
      id: 1,
      name: "Bancada Hidropônica",
      images: [
        require("../assets/Bancada Hidropônica 0.png"),
        require("../assets/Bancada Hidropônica 1.png"),
        require("../assets/Bancada Hidropônica 2.png"),
      ],
      price: "R$ 687,00",
      description: "Uma linda bancada hidropônica para decorar seu espaço.",
    },
    {
      id: 2,
      name: "Caixa Hidropônica",
      images: [
        require("../assets/Caixa Hidropônica 0.png"),
        require("../assets/Caixa Hidropônica 1.png"),
        require("../assets/Caixa Hidropônica 2.png"),
      ],
      price: "R$ 302,99",
      description: "Ideal para purificar o ar e decorar ambientes internos.",
    },
    {
      id: 3,
      name: "Horta Hidropônica",
      images: [
        require("../assets/Horta Hidropônica 0.png"),
        require("../assets/Horta Hidropônica 1.png"),
        require("../assets/Horta Hidropônica 2.png"),
      ],
      price: "R$ 59,90",
      description: "Horta elegante para dar um toque especial à sua decoração.",
    },
  ];

  const handleImageChange = (productId: number, index: number, images: any[]) => {
    setSelectedImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId]: (index + images.length) % images.length,
    }));
  };

  const changeQuantity = (id: number, increment: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + increment),
    }));
  };

  const addToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantidade: item.quantidade + (quantities[productId] || 1) }
              : item
          );
        } else {
          return [
            ...prevCart,
            {
              ...product,
              quantidade: quantities[productId] || 1,
              nome: product.name,
              preco: product.price,
              imagens: product.images,
              descricao: product.description,
            },
          ];
        }
      });
    }
  };

  const handleLogout = () => {
    clearUserInfo();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Olá, {name}!</Text>
          <Text style={styles.subtitle}>Bem-vindo!</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.iconContainer}>
            <Button
              icon={{ name: "shopping-cart", color: "#FFF" }}
              buttonStyle={styles.iconButton}
              onPress={() => navigation.navigate("Cart", { cart })}
            />
          </View>
          <TouchableOpacity>
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.profileImage} />
            ) : (
              <Image source={require("../assets/Usuario.png")} style={styles.profileImage} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutContainer}>
            <Text style={styles.logout}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.productsContainer}>
        <Text style={styles.title}>Produtos</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <View style={styles.imageSliderContainer}>
                <TouchableOpacity
                  onPress={() =>
                    handleImageChange(item.id, (selectedImageIndexes[item.id] || 0) - 1, item.images)
                  }
                >
                  <Text style={styles.arrow}>{"<"}</Text>
                </TouchableOpacity>
                <Image
                  source={item.images[selectedImageIndexes[item.id] || 0]}
                  style={styles.productImage}
                />
                <TouchableOpacity
                  onPress={() =>
                    handleImageChange(item.id, (selectedImageIndexes[item.id] || 0) + 1, item.images)
                  }
                >
                  <Text style={styles.arrow}>{">"}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => changeQuantity(item.id, -1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{quantities[item.id] || 1}</Text>
                <TouchableOpacity
                  onPress={() => changeQuantity(item.id, 1)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => addToCart(item.id)}
                style={styles.addToCartButton}
              >
                <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#fff" },
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
  profileContainer: { alignItems: "center", position: "relative", flexDirection: "row" },
  iconContainer: { marginRight: 10 },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  logoutContainer: { position: "absolute", bottom: -20, left: "50%", transform: [{ translateX: -10 }] },
  logout: { fontSize: 16, color: "#006400", textDecorationLine: "underline" },
  iconButton: { backgroundColor: "#006400", padding: 10, borderRadius: 30 },
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
  addToCartText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;