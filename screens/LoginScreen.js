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
  const { colors } = useTheme();

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
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View style={styles.themeSwitchContainer}>
            <ThemeSwitch />
          </View>
          <View style={styles.container}>
            <Text style={[styles.topText, { color: colors.secondary }]}>Seja bem-vindo</Text>
            <Text style={[styles.logoText, { color: colors.secondary }]}></Text>
            <View style={[styles.loginBox, { backgroundColor: colors.surface }]}>
              <Image source={require('../assets/Real-logo.png')} style={styles.logo} />
              <Text style={[styles.loginTitle, { color: colors.text }]}>Entrar</Text>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]}
                placeholder="Email"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
              <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]}
                placeholder="Password"
                placeholderTextColor={colors.placeholder}
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
                editable={!loading}
              />
              <TouchableOpacity onPress={handleForgotPassword} disabled={loading}>
                <Text style={[styles.forgotPassword, { color: colors.subtext }]}>Esqueceu a senha?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>
                  {loading ? 'Signing in...' : 'Login'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registro')} disabled={loading}>
                <Text style={[styles.backToRegister, { color: colors.subtext }]}>Crie uma nova conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, position: 'relative' },
  themeSwitchContainer: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  topText: { fontSize: 36, marginBottom: 5 },
  logoText: { fontSize: 32, fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-condensed', marginBottom: 20 },
  loginBox: { width: '100%', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  logo: { width: 150, height: 150, marginBottom: 10, resizeMode: 'contain',},
  loginTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { alignSelf: 'flex-start', marginBottom: 5, marginTop: 10 },
  input: { width: '100%', padding: 12, borderRadius: 10, marginBottom: 5, borderWidth: 1 },
  forgotPassword: { color: '#fff', marginTop: 10, fontSize: 12, textDecorationLine: 'underline', alignSelf: 'flex-end' },
  button: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 40, marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backToRegister: { marginTop: 15, fontSize: 12, textDecorationLine: 'underline' },
});