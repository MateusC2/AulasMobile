// src/components/CardUser.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardUser = ({ name, email, companyName, addressZipcode }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>Email: {email}</Text>
      <Text style={styles.detail}>Empresa: {companyName}</Text>
      <Text style={styles.detail}>CEP: {addressZipcode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
});

export default CardUser;