import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

type RootStackParamList = {
  ProductDetail: { id: number; name: string; images: any[]; price: string; description: string };
  Cart: { cart: any[] };
};

type ProductDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "ProductDetail">;
  route: RouteProp<RootStackParamList, "ProductDetail">;
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
  const { name, images, price, description, id } = route.params;
  const [imageIndex, setImageIndex] = useState(0);
  const { userInfo } = useUser();

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    Alert.alert("Success", "Product added to cart!");
    navigation.navigate("Cart", {
      cart: [{ id, name, price, quantity: 1, images, description }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handlePrevImage}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Image source={images[imageIndex]} style={styles.productImage} />
        <TouchableOpacity onPress={handleNextImage}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <Text style={styles.productDescription}>{description}</Text>

      <Text style={styles.userName}>Hello, {userInfo.name || "User"}!</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
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
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#006400",
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

export default ProductDetailScreen;