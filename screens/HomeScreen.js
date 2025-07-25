import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Image, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const [receita, setReceita] = useState(null);
  const [erro, setErro] = useState('');
  const { colors } = useTheme();

  const buscarReceita = () => {
    if (!busca.trim()) {
      setErro('Digite o nome de uma receita.');
      setReceita(null);
      return;
    }
    setErro('');
    setLoading(true);
    setReceita(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(busca)}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals[0]) {
          const receitaOriginal = data.meals[0];
          Promise.all([
            fetch('https://libretranslate.de/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ q: receitaOriginal.strMeal, source: 'en', target: 'pt' })
            }).then(res => res.json()),
            fetch('https://libretranslate.de/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ q: receitaOriginal.strInstructions, source: 'en', target: 'pt' })
            }).then(res => res.json())
          ]).then(([nomeTraduzido, instrucoesTraduzidas]) => {
            setReceita({
              ...receitaOriginal,
              strMeal: nomeTraduzido.translatedText,
              strInstructions: instrucoesTraduzidas.translatedText
            });
            setLoading(false);
          }).catch((err) => {
            console.log('Erro ao traduzir:', err);
            setReceita(receitaOriginal);
            setErro('Erro ao traduzir a receita');
            setLoading(false);
          });
        } else {
          setReceita(null);
          setErro('Nenhuma receita encontrada');
          setLoading(false);
        }
      })
      .catch(() => {
        setReceita(null);
        setErro('Erro ao buscar receita');
        setLoading(false);
      });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Bem-vindo à Home!</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.subtext }]}
        placeholder="Digite o nome da receita (ex: pasta, chicken, soup...)"
        placeholderTextColor={colors.placeholder}
        value={busca}
        onChangeText={setBusca}
        editable={!loading}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={buscarReceita} disabled={loading}>
        <Text style={styles.buttonText}>Buscar Receita</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="small" color={colors.primary} />}
      {erro ? <Text style={[styles.erro, { color: colors.primary }]}>{erro}</Text> : null}
      {receita && (
        <View style={[styles.resultBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.resultTitle, { color: colors.primary }]}>{receita.strMeal}</Text>
          {receita.strMealThumb && (
            <Image source={{ uri: receita.strMealThumb }} style={styles.img} />
          )}
          <Text style={[styles.resultSubtitle, { color: colors.text }]}>Ingredientes:</Text>
          {Array.from({ length: 20 }, (_, i) => {
            const ingrediente = receita[`strIngredient${i + 1}`];
            const medida = receita[`strMeasure${i + 1}`];
            if (ingrediente && ingrediente.trim() !== '') {
              return (
                <Text key={i} style={[styles.result, { color: colors.subtext }]}>
                  {ingrediente} {medida}
                </Text>
              );
            }
            return null;
          })}
          <Text style={[styles.resultSubtitle, { color: colors.text }]}>Modo de preparo:</Text>
          <Text style={[styles.result, { color: colors.subtext }]}>{receita.strInstructions}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', padding: 12, borderRadius: 10, marginBottom: 10, fontSize: 16, borderWidth: 1 },
  button: { padding: 12, borderRadius: 10, marginBottom: 16, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  erro: { marginTop: 10, fontSize: 16, textAlign: 'center' },
  resultBox: { marginTop: 24, borderRadius: 12, padding: 16, width: '100%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  resultTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  img: { width: 200, height: 200, borderRadius: 10, marginBottom: 16 },
  resultSubtitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' },
  result: { fontSize: 16, textAlign: 'left' },
});