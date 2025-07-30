import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você gostaria de fazer?</Text>
      <View style={styles.buttonWrapper}>
        <Button
          title="Ver Posts"
          onPress={() => navigation.navigate('Posts')}
          color="#4287f5"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Ver Usuários"
          onPress={() => navigation.navigate('Users')}
          color="#4287f5"
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Ver Tarefas"
          onPress={() => navigation.navigate('Todos')}
          color="#4287f5"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f2f5', // Fundo claro para a tela
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  buttonWrapper: {
    backgroundColor: '#fff', // Fundo branco para envolver o botão
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    minWidth: 280,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});