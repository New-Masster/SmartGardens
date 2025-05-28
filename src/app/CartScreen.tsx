import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Cart: { cart: any[] };
  Home: { cart: any[] };
  Payment: undefined;
};

type CartScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Cart">;
  route: RouteProp<RootStackParamList, "Cart">;
};

const CartScreen: React.FC<CartScreenProps> = ({ navigation, route }) => {
  const { userInfo } = useUser();
  const [cart, setCart] = useState(route.params?.cart ?? []);

  useEffect(() => {
    navigation.setParams({ cart });
  }, [cart]);

  const calculateTotal = (price: string, quantity: number) => {
    const numericPrice = parseFloat(price.replace("R$", "").replace(",", "."));
    return (numericPrice * quantity).toFixed(2).replace(".", ",");
  };

  const calculateGrandTotal = () => {
    return cart
      .reduce((total, item) => {
        const numericPrice = parseFloat(item.preco.replace("R$", "").replace(",", "."));
        return total + numericPrice * item.quantidade;
      }, 0)
      .toFixed(2)
      .replace(".", ",");
  };

  const changeQuantity = (id: number, increment: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantidade: Math.max(1, item.quantidade + increment) } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
            <Text style={styles.title}>My Cart</Text>
          </View>

          <Text style={styles.userName}>Hello, {userInfo.name || "User"}!</Text>

          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <View style={styles.productContainer} key={item.id}>
                  <Image source={item.imagens[0]} style={styles.productImage} />
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.nome}</Text>
                    <Text style={styles.productPrice}>Unit price: {item.preco}</Text>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => changeQuantity(item.id, -1)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityValue}>{item.quantidade}</Text>
                      <TouchableOpacity
                        onPress={() => changeQuantity(item.id, 1)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.productTotal}>
                      Subtotal: R$ {calculateTotal(item.preco, item.quantidade)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.trashButton}
                  >
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: R$ {calculateGrandTotal()}</Text>
              </View>
              <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                <FontAwesome name="trash" size={24} color="white" />
                <Text style={styles.clearButtonText}>Empty Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={() => navigation.navigate("Payment")}
              >
                <FontAwesome name="credit-card" size={24} color="white" />
                <Text style={styles.paymentButtonText}>Checkout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home", { cart })}
          >
            <FontAwesome name="arrow-left" size={24} color="white" />
            <Text style={styles.buttonText}>Back</Text>
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
    paddingBottom: 30,
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
    marginBottom: 30,
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

export default CartScreen;