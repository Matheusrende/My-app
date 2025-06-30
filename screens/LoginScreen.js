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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogin = () => {
    if (email === 'teste@email.com' && senha === '1234') {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } else {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  };

  return (
    <View style={styles.wrapper}> 

      
      <View style={styles.themeSwitchContainer}> 
        <ThemeSwitch /> 
      </View>

      <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f0f4f7' }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <Text style={[styles.titulo, { color: isDark ? '#fff' : '#333' }]}>Login</Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          placeholder="Digite seu e-mail"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          placeholder="Digite sua senha"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={[styles.link, { color: '#4a90e2' }]}>Criar nova conta</Text>
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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
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
});
