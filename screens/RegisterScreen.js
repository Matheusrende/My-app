import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSwitch from '../components/ThemeSwitch'; 

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleRegister = () => {
    if (nome && email && senha) {
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <View style={styles.wrapper}> 

      {/* ✅ Botão no canto superior direito */}
      <View style={styles.themeSwitchContainer}>
        <ThemeSwitch />
      </View>
      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f0f4f7' }]}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />

        <Text style={[styles.titulo, { color: isDark ? '#fff' : '#333' }]}>Criar Conta</Text>
        

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          placeholder="Seu nome"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          placeholder="Seu e-mail"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          placeholder="Senha"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleRegister}>
          <Text style={styles.textoBotao}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.link, { color: '#4a90e2' }]}>Voltar para login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative', 
  },
  themeSwitchContainer: {
    position: 'absolute', 
    top: 30,
    right: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  botao: {
    width: '100%',
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
