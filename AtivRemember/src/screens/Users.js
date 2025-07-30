import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import sheets from '../axios/api'; 
import CardUser from '../components/CardUser';
import Header from '../components/Header';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sheets.users();
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err); 
        setError("Não foi possível carregar os dados dos usuários. Tente novamente mais tarde."); 
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando usuários...</Text> 
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
      <Header title="Usuários" />
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CardUser
            name={item.name}
            email={item.email}
            companyName={item.company.name}
            addressZipcode={item.address.zipcode}
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
  loadingText: { // <--- Adicionado
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: { // <--- Adicionado
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});