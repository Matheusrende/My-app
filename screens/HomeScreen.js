import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [receita, setReceita] = useState(null);

  const buscarReceita = () => {
    setLoading(true);
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=pasta')
      .then(res => res.json())
      .then(data => {
        setReceita(data.meals ? data.meals[0].strMeal : 'Nenhuma receita encontrada');
        setLoading(false);
      })
      .catch(() => {
        setReceita('Erro ao buscar receita');
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à Home!</Text>
      <TouchableOpacity style={styles.button} onPress={buscarReceita}>
        <Text style={styles.buttonText}>Buscar Receita</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="small" color="#B7512C" />}
      {receita && <Text style={styles.result}>{receita}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B7512C',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});