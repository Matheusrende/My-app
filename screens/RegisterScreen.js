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
  const { colors } = useTheme();

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
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.wrapper}>
          <View style={styles.themeSwitchContainer}>
            <ThemeSwitch />
          </View>
          <View style={styles.container}>
            <Text style={[styles.topText, { color: colors.secondary }]}>Crie sua conta</Text>
            <Text style={[styles.logoText, { color: colors.secondary }]}></Text>
            <View style={[styles.registerBox, { backgroundColor: colors.surface }]}>
              <Image source={require('../assets/Real-logo.png')} style={styles.logo} />
              <Text style={[styles.registerTitle, { color: colors.text }]}>Sign Up</Text>
              <Text style={[styles.label, { color: colors.text }]}>Nome</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]} placeholder="Nome" placeholderTextColor={colors.placeholder} value={nome} onChangeText={setNome} editable={!loading}/>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]} placeholder="Email" placeholderTextColor={colors.placeholder} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading}/>
              <Text style={[styles.label, { color: colors.text }]}>Confirme seu Email</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]} placeholder="Confirme seu Email" placeholderTextColor={colors.placeholder} value={confirmarEmail} onChangeText={setConfirmarEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading}/>
              <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]} placeholder="Senha" placeholderTextColor={colors.placeholder} secureTextEntry value={senha} onChangeText={setSenha} editable={!loading}/>
              <Text style={[styles.label, { color: colors.text }]}>Confirme sua Senha</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.subtext }]} placeholder="Confirme sua Senha" placeholderTextColor={colors.placeholder} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} editable={!loading}/>
              <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }, loading && { opacity: 0.7 }]} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Registrar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
                <Text style={[styles.backToLogin, { color: colors.subtext }]}>De volta ao login</Text>
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
  themeSwitchContainer: { position: 'absolute', top: 30, right: 20, zIndex: 10 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  topText: { fontSize: 35,top:15, marginBottom: 5 },
  logoText: { fontSize: 32, fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-condensed', marginBottom: 20 },
  registerBox: { width: '100%', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10 },
  logo: { width: 150, height: 150, marginBottom: 10, resizeMode: 'contain',},
  registerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { alignSelf: 'flex-start', marginBottom: 5, marginTop: 10 },
  input: { width: '100%', padding: 12, borderRadius: 10, marginBottom: 5, borderWidth: 1 },
  button: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 40, marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backToLogin: { marginTop: 15, fontSize: 12, textDecorationLine: 'underline' },
});