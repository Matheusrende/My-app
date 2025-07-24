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
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const boxBackgroundColor = isDark ? '#222222' : '#B7512C';

  const handleLogin = () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email.trim(), senha)
      .then(() => {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      })
      .finally(() => setLoading(false));
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Digite seu e-mail para redefinir a senha.');
      return;
    }
    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert('Sucesso', 'E-mail de redefinição enviado!');
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      });
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
            <Text style={[styles.topText, { color: isDark ? '#fff' : '#333' }]}>Welcome back</Text>
            <Text style={styles.logoText}></Text>

            <View style={[styles.loginBox, { backgroundColor: boxBackgroundColor }]}>
              <Image source={require('../assets/logo1.png')} style={styles.logo} />

              <Text style={styles.loginTitle}>Sign In</Text>

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

              <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, loading && { backgroundColor: '#D38264' }]} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Login'}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Registro')} disabled={loading}>
                <Text style={styles.backToRegister}>Create a new account</Text>
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
  loginBox: {
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
  loginTitle: {
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
  forgotPassword: {
    color: '#fff',
    marginTop: 10,
    fontSize: 12,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
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
  backToRegister: {
    color: '#fff',
    marginTop: 15,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});
