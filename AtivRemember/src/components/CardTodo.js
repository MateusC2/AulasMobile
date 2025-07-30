// src/components/CardTodo.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox'; // Instale com: npx expo install expo-checkbox

const CardTodo = ({ title, completed, userName, onToggle }) => {
  const [isChecked, setIsChecked] = useState(completed);

  // Função para lidar com a mudança do checkbox localmente
  const handleToggle = () => {
    setIsChecked(!isChecked);
    // Se precisar notificar o pai sobre a mudança, você pode usar onToggle
    if (onToggle) {
      onToggle(!isChecked);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <CheckBox
          value={isChecked}
          onValueChange={handleToggle}
          color={isChecked ? '#4630EB' : undefined}
          style={styles.checkbox}
        />
        <Text style={[styles.title, isChecked && styles.completedTitle]}>{title}</Text>
      </View>
      {userName && <Text style={styles.userName}>Feito por: {userName}</Text>}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // Permite que o texto quebre linha
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  userName: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 5,
    marginLeft: 30, // Alinha com o texto do título
  },
});

export default CardTodo;