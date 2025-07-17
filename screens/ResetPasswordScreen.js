import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSwitch from '../components/ThemeSwitch';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Digite seu e-mail.');
      return;
    }
    setLoading(true);
    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert('Sucesso', 'E-mail de redefinição enviado!');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Erro', error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#f0f4f7' }]}>
      <View style={styles.themeSwitchContainer}>
        <ThemeSwitch />
      </View>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
        Redefinir Senha
      </Text>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: isDark ? '#222' : '#fff', color: isDark ? '#fff' : '#000' }
        ]}
        placeholder="Digite seu e-mail"
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TouchableOpacity
        style={[
          styles.button,
          loading && { backgroundColor: '#999' }
        ]}
        onPress={handleReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar e-mail'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
        <Text style={[styles.link, { color: '#4a90e2' }]}>
          Voltar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  themeSwitchContainer: {position: 'absolute',top: 30,right: 20,zIndex: 10, },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', padding: 12, borderRadius: 8, borderColor: '#ccc', borderWidth: 1, marginBottom: 20 },
  button: { width: '100%', backgroundColor: '#4a90e2', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { marginTop: 20, color: '#4a90e2', fontSize: 16 }
});