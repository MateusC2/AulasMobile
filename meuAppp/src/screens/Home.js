import React from "react";
import { View, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você gostaria de fazer?</Text>
      <View style={styles.buttonWrapper}>
        <Button
          title="Criar Evento"
          onPress={() => navigation.navigate("CadastroEvento")}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Criar Organizadores"
          onPress={() => navigation.navigate("CadastroOrganizador")}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Criar Ingressos"
          onPress={() => navigation.navigate("CadastroIngresso")}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Ver Lista de Eventos"
          onPress={() => navigation.navigate("EventosScreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#263238",
  },
  buttonWrapper: {
    backgroundColor: "blue", // <----- AQUI ESTÁ A MUDANÇA PARA AZUL
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
    minWidth: 280,
  },
});