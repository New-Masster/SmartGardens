import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

const Screen1: React.FC<{ navigation: any }> = ({ navigation }) => {
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

  const handleRegister = () => {
    const finalName = name || "Mariana";
    const finalSurname = surname || "Silveira";
    const finalEmail = email || "teste@teste.com";
    const finalPhone = phone || "82 99999-9999";
    const finalCep = cep || "57000-00";
    const finalAddress = address || "Endereço não encontrado";
    const finalNumber = number || "Número não informado";
    const finalStreet = street || "Rua não informada";
    const finalNeighborhood = neighborhood || "Bairro não informado";
    const finalCity = city || "Cidade não informada";
    const finalState = state || "Estado não informado";

    navigation.navigate("Screen2", { nome: finalName, sobrenome: finalSurname });
  };

  const handleCepChange = async (cepInput: string) => {
    setCep(cepInput);
    if (cepInput.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepInput}/json/`); //API de consulta de CEP gratuita - VIACEP
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

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <ImageBackground source={require("../assets/Fundo_cadastro.png")}
        style={styles.background}
        imageStyle={{ opacity: 0.7}}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Cadastro</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Sobrenome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu sobrenome"
                value={surname}
                onChangeText={setSurname}
              />
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
    justifyContent: "flex-start", // Alinha o conteúdo n início da tela
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
