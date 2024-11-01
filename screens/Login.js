import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginApp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation(); // Hook para acessar a navegação

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuário registrado:', userCredential.user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Erro ao registrar usuário:', error.message);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuário logado:', userCredential.user);
        setIsAuthenticated(true);        
        navigation.navigate('TarefasApp'); // Navegação após o login
      })
      .catch((error) => {
        console.error('Erro ao fazer login:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Auth com Expo</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Registrar" style={styles.butao} onPress={handleRegister} />
      <Button title="Login" style={styles.butao} onPress={handleLogin} />
      {isAuthenticated && <Text style={styles.success}>Autenticado com sucesso!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    height: 40, borderColor: 'gray', borderWidth: 1,
    marginBottom: 10, padding: 8
  },
  success: { color: 'green', marginTop: 10, textAlign: 'center' },
  butao: {marginVertical: 10},
});
