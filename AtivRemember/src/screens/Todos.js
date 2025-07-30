import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import sheets from '../axios/api';
import CardTodo from '../components/CardTodo';
import Header from '../components/Header';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodosAndUsers = async () => {
      try {
        const [todosResponse, usersResponse] = await Promise.all([
          sheets.todos(),
          sheets.users()
        ]);
        setTodos(todosResponse.data);
        setUsers(usersResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar tarefas ou usuários:", err);
        setError("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchTodosAndUsers();
  }, []);

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Responsável Desconhecido';
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Tarefas" />
      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardTodo
            title={item.title}
            completed={item.completed}
            userName={getUserName(item.userId)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});