import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setUserInfo } = useUser();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [photo, setPhoto] = useState<string | null>(null);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name) errors.name = "Name is required";
    if (!surname) errors.surname = "Surname is required";
    if (!email) errors.email = "Email is required";
    if (!phone) errors.phone = "Phone is required";
    if (!cep) errors.cep = "ZIP code is required";
    if (!number) errors.number = "Number is required";
    if (!address && !street) errors.address = "Address is required";
    if (!password) errors.password = "Password is required";
    if (!confirmPassword) errors.confirmPassword = "Confirm your password";
    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    setUserInfo({
      name,
      surname,
      email,
      phone,
      cep,
      address,
      number,
      street,
      neighborhood,
      city,
      state,
      photo,
    });

    navigation.navigate("Home");
  };

  const handleCepChange = async (cepInput: string) => {
    setCep(cepInput);
    if (cepInput.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
          setStreet(data.logradouro);
          setNeighborhood(data.bairro);
          setCity(data.localidade);
          setState(data.uf);
          setErrorMessage("");
        } else {
          setErrorMessage("ZIP code not found. Fill in the data manually.");
          setAddress("");
        }
      } catch (error) {
        setErrorMessage("Error fetching ZIP code.");
        setAddress("");
      }
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "We need camera access to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Register</Text>

            <TouchableOpacity onPress={handleTakePhoto} style={styles.photoContainer}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <Text style={styles.photoPlaceholder}>Take Photo</Text>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              {formErrors.name && <Text style={styles.errorMessage}>{formErrors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Surname</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your surname"
                value={surname}
                onChangeText={setSurname}
              />
              {formErrors.surname && <Text style={styles.errorMessage}>{formErrors.surname}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              {formErrors.email && <Text style={styles.errorMessage}>{formErrors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              {formErrors.password && <Text style={styles.errorMessage}>{formErrors.password}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {formErrors.confirmPassword && (
                <Text style={styles.errorMessage}>{formErrors.confirmPassword}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="(XX) 99999-9999"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
              {formErrors.phone && <Text style={styles.errorMessage}>{formErrors.phone}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>ZIP code</Text>
              <TextInput
                style={styles.input}
                placeholder="57000-000"
                keyboardType="numeric"
                value={cep}
                onChangeText={handleCepChange}
              />
              {formErrors.cep && <Text style={styles.errorMessage}>{formErrors.cep}</Text>}
            </View>

            {address ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  value={address}
                  editable={false}
                />
              </View>
            ) : (
              errorMessage && (
                <View style={styles.inputContainer}>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              )
            )}

            {address === "" && errorMessage && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Street</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter the street"
                    value={street}
                    onChangeText={setStreet}
                  />
                  {formErrors.address && <Text style={styles.errorMessage}>{formErrors.address}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Neighborhood</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter the neighborhood"
                    value={neighborhood}
                    onChangeText={setNeighborhood}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>City</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter the city"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>State</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter the state"
                    value={state}
                    onChangeText={setState}
                  />
                </View>
              </>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number</Text>
              <TextInput
                style={styles.input}
                placeholder="House number"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
              />
              {formErrors.number && <Text style={styles.errorMessage}>{formErrors.number}</Text>}
            </View>

            <Button title="Register" onPress={handleRegister} />

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Already have an account? Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  innerContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#006400",
  },
  photoContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    fontSize: 16,
    color: "#666",
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
  errorMessage: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  link: {
    color: "#006400",
    fontWeight: "bold",
    marginTop: 12,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;