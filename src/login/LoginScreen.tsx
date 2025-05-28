import React, { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import { auth } from '../config/firebase';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [contact, setContact] = useState("");

  const handleSend = () => {
    if (contact.includes("@")) {
      Alert.alert("Email sent", "Check your inbox.");
    } else if (/^\d+$/.test(contact)) {
      Alert.alert("SMS sent", "Check your messages.");
    } else {
      Alert.alert("Error", "Enter a valid email or phone number.");
    }
    setForgotPasswordVisible(false);
    setContact("");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Logo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Enter your SmartGardens credentials to continue</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password" 
          placeholderTextColor="#aaa"
          secureTextEntry 
        />
      </View>

      <Button title="Sign In" onPress={() => navigation.navigate("Home", { email })} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setForgotPasswordVisible(true)}>
        <Text style={styles.link}>Forgot your password?</Text>
      </TouchableOpacity>

      <Modal visible={forgotPasswordVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Password Recovery</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email or phone"
              keyboardType="default"
              value={contact}
              onChangeText={setContact}
            />
            <View style={styles.buttonContainer}>
              <Button title="Send" onPress={handleSend} />
              <Button title="Cancel" onPress={() => setForgotPasswordVisible(false)} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    width: "100%",
  },
  logo: {
    width: 220,
    height: 180,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#006400",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#006400",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#006400", 
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#555", 
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#fff", 
    color: "#444", 
  },
  link: {
    color: "#274200",
    fontWeight: "bold",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});

export default LoginScreen;