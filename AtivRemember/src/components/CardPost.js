// src/components/CardPost.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardPost = ({ title, body, userName }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {userName && <Text style={styles.userName}>Autor: {userName}</Text>}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  userName: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default CardPost;