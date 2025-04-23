import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Evento"
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("CadastroEvento")}
      />
      <Button
        title="Organizador"
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("CadastroOrganizador")}
      />
      
      <Button
        title="Ingresso"
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("CadastroIngresso")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
