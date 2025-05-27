import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handlePayment = () => {
    Alert.alert("Pagamento realizado", "Seu pedido foi finalizado com sucesso!");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Pagamento</Text>
        <Text style={styles.subtitle}>Escolha a forma de pagamento e finalize sua compra.</Text>

        {/* Simulação de opções de pagamento */}
        <TouchableOpacity style={styles.paymentOption} onPress={handlePayment}>
          <Text style={styles.paymentText}>Cartão de Crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={handlePayment}>
          <Text style={styles.paymentText}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={handlePayment}>
          <Text style={styles.paymentText}>Boleto Bancário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#006400", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#274200", marginBottom: 30, textAlign: "center" },
  paymentOption: {
    backgroundColor: "#32CD32",
    padding: 18,
    borderRadius: 10,
    marginBottom: 18,
    width: "100%",
    alignItems: "center",
  },
  paymentText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  backButton: { marginTop: 20 },
  backButtonText: { color: "#1E90FF", fontSize: 16, textDecorationLine: "underline" },
});

export default PaymentScreen;