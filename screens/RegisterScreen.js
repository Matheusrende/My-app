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
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const boxBackgroundColor = isDark ? '#222222' : '#B7512C';

  const handleRegister = () => {
    if (!nome.trim() || !email.trim() || !confirmarEmail.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

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
      style={{ flex: 1, backgroundColor: isDark ? '#000' : '#e6e6e6' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View style={styles.themeSwitchContainer}>
            <ThemeSwitch />
          </View>

          <View style={styles.container}>
            <Text style={styles.topText}>Create your account</Text>
            <Text style={styles.logoText}>Pet Shop</Text>

            <View style={[styles.registerBox, { backgroundColor: boxBackgroundColor }]}>
              <Image source={require('../assets/logo1.png')} style={styles.logo} />

              <Text style={styles.registerTitle}>Sign Up</Text>

              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#fff"
                value={nome}
                onChangeText={setNome}
                editable={!loading}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />

              <Text style={styles.label}>Confirm Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your email"
                placeholderTextColor="#fff"
                value={confirmarEmail}
                onChangeText={setConfirmarEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                editable={!loading}
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#fff"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                editable={!loading}
              />

              <TouchableOpacity style={[styles.button, loading && { backgroundColor: '#D38264' }]} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Register'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
                <Text style={styles.backToLogin}>Back to Login</Text>
              </TouchableOpacity>

            </View>

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
  topText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F45D48',
    fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-condensed',
    marginBottom: 20,
  },
  registerBox: {
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    padding: 25,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  registerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#D38264',
    padding: 12,
    borderRadius: 20,
    marginBottom: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: '#F45D48',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backToLogin: {
    color: '#fff',
    marginTop: 15,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
