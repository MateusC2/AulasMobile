import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import api from "../axios/axios";

export default function CadastroIngresso({ navigation }) {
  const [ingresso, setIngresso] = useState({
    preco: "",
    tipo: "",
    fk_id_ingresso: "",
  });

  async function handleCadastroIngresso() {
    await api.postCadastroIngresso(ingresso).then(
      (response) => {
        console.log(response.data.message);
        Alert.alert("OK", response.data.message);
      },
      (error) => {
        console.log(error.response.data.error);
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>Faça Cadastro do ingresso</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço do ingresso"
        value={ingresso.preco}
        onChangeText={(value) => {
          setIngresso({ ...ingresso, preco: value });
        }}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="tipo"
        value={ingresso.tipo}
        onChangeText={(value) => {
          setIngresso({ ...ingresso, tipo: value });
        }}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Fk Id do Evento"
        keyboardType="numeric"
        value={ingresso.fk_id_evento}
        onChangeText={(value) => {
          setIngresso({ ...ingresso, fk_id_evento: value });
        }}
      ></TextInput>

      <TouchableOpacity onPress={handleCadastroIngresso} style={styles.button}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <Button
        title="Voltar para Home"
        onPress={() => navigation.navigate("Home")}
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
  tittle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
});
