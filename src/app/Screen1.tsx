import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // Importa o Image Picker para capturar foto
import { useUser } from "../context/UserContext"; // Importando o contexto

const Screen1: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { setUserInfo } = useUser(); // Usando o contexto para salvar as informações do usuário

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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [photo, setPhoto] = useState<string | null>(null); // Armazena a foto do usuário

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name) errors.name = "Nome é obrigatório";
    if (!surname) errors.surname = "Sobrenome é obrigatório";
    if (!email) errors.email = "E-mail é obrigatório";
    if (!phone) errors.phone = "Telefone é obrigatório";
    if (!cep) errors.cep = "CEP é obrigatório";
    if (!number) errors.number = "Número é obrigatório";
    if (!address && !street) errors.address = "Endereço é obrigatório";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    // Salvar as informações no contexto global
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

    // Navegar para a Screen2
    navigation.navigate("Screen2");
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
          setErrorMessage("CEP não encontrado. Por favor, insira os dados manualmente.");
          setAddress("");
        }
      } catch (error) {
        setErrorMessage("Erro ao buscar o CEP.");
        setAddress("");
      }
    }
  };

  // Função para abrir a câmera e capturar a foto
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos de acesso à câmera para tirar uma foto.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Armazena o URI da foto capturada
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackground
          source={require("../assets/Fundo_cadastro.png")}
          style={styles.background}
          imageStyle={{ opacity: 0.7 }}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Cadastro</Text>

            
            <TouchableOpacity onPress={handleTakePhoto} style={styles.photoContainer}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.photo} />
              ) : (
                <Text style={styles.photoPlaceholder}>Tirar Foto</Text>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
              />
              {formErrors.name && <Text style={styles.errorMessage}>{formErrors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Sobrenome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu sobrenome"
                value={surname}
                onChangeText={setSurname}
              />
              {formErrors.surname && <Text style={styles.errorMessage}>{formErrors.surname}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="exemplo@exemplo.com"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              {formErrors.email && <Text style={styles.errorMessage}>{formErrors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefone</Text>
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
              <Text style={styles.label}>CEP</Text>
              <TextInput
                style={styles.input}
                placeholder="57000-00"
                keyboardType="numeric"
                value={cep}
                onChangeText={handleCepChange}
              />
              {formErrors.cep && <Text style={styles.errorMessage}>{formErrors.cep}</Text>}
            </View>

            {address ? (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Endereço"
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
                  <Text style={styles.label}>Rua</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite a rua"
                    value={street}
                    onChangeText={setStreet}
                  />
                  {formErrors.address && <Text style={styles.errorMessage}>{formErrors.address}</Text>}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bairro</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o bairro"
                    value={neighborhood}
                    onChangeText={setNeighborhood}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Cidade</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite a cidade"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Estado</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o estado"
                    value={state}
                    onChangeText={setState}
                  />
                </View>
              </>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Número</Text>
              <TextInput
                style={styles.input}
                placeholder="Número da residência"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
              />
              {formErrors.number && <Text style={styles.errorMessage}>{formErrors.number}</Text>}
            </View>

            <Button title="Cadastrar" onPress={handleRegister} />

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Já tem uma conta? Faça login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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

export default Screen1;