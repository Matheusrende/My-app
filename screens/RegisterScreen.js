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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState(''); // ✅ MUDANÇA: novo estado
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleRegister = () => {
    // ✅ MUDANÇA: agora valida também confirmarEmail
    if (!nome.trim() || !email.trim() || !confirmarEmail.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // ✅ MUDANÇA: valida igualdade entre e-mail e confirmação
    if (email !== confirmarEmail) {
      Alert.alert('Erro', 'Os e-mails não coincidem.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(auth, email.trim(), senha)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: nome.trim() }).catch(() => {});
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.goBack();
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
              editable={!loading}
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
              autoCapitalize="none"
              editable={!loading}
            />

            
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
              ]}
              placeholder="Confirmar e-mail"
              placeholderTextColor={isDark ? '#aaa' : '#666'}
              keyboardType="email-address"
              value={confirmarEmail}
              onChangeText={setConfirmarEmail}
              autoCapitalize="none"
              editable={!loading}
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
              editable={!loading}
            />

            <TextInput
              style={[
                styles.input,
                { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' },
              ]}
              placeholder="Confirmar senha"
              placeholderTextColor={isDark ? '#aaa' : '#666'}
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              editable={!loading}
            />

            <TouchableOpacity
              style={[styles.botao, loading && { backgroundColor: '#999' }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.textoBotao}>
                {loading ? 'Criando conta...' : 'Registrar'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
              <Text style={[styles.link, { color: '#4a90e2' }]}>Voltar para login</Text>
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
