import React from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Logo.png')}
        style={styles.logo}
      />
      
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail (ex: exemplo@email.com)"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
      />

      <Button title="Entrar" onPress={() => console.log('Login pressionado')} />
      
      <TouchableOpacity onPress={() => console.log('Redirecionar para cadastro')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 190,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  link: {
    color: '#1E90FF',
    marginTop: 15,
  },
});

export default LoginScreen;