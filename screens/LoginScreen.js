import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email.trim(), senha)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        // Aqui você pode navegar para a tela principal do app
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View style={styles.themeSwitchContainer}>
            <ThemeSwitch />
          </View>

          <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f0f4f7' }]}>
            <Image source={require('../assets/logo1.png')} style={styles.logo} />

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
              autoCapitalize="none"
              editable={!loading}
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
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.botao, loading && { backgroundColor: '#999' }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.textoBotao}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registro')} disabled={loading}>
              <Text style={[styles.link, { color: '#4a90e2' }]}>Criar nova conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
