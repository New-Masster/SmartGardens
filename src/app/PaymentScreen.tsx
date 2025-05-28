import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const handlePayment = () => {
    Alert.alert("Payment completed", "Your order has been successfully placed!");
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Choose the payment method and complete your purchase.</Text>

        {/* Payment options simulation */}
        <TouchableOpacity style={styles.paymentOption} onPress={handlePayment}>
          <Text style={styles.paymentText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={handlePayment}>
          <Text style={styles.paymentText}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={handlePayment}>
          <Text style={styles.paymentText}>Bank Slip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
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