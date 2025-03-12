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

export default function CadastroOrganizador({ navigation }) {
  const [orgs, setOrg] = useState({
    nome: "",
    senha: "",
    email: "",
    telefone: "",
  });

  async function handleCadastroOrganizador() {
    await api.postCadastroOrganizador(orgs).then(
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
      <Text style={styles.tittle}>Faça Cadastro do Organizador</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={orgs.nome}
        onChangeText={(value) => {
          setOrg({ ...orgs, nome: value });
        }}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={orgs.senha}
        onChangeText={(value) => {
          setOrg({ ...orgs, senha: value });
        }}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="numeric"
        value={orgs.telefone}
        onChangeText={(value) => {
          setOrg({ ...orgs, telefone: value });
        }}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={orgs.email}
        onChangeText={(value) => {
          setOrg({ ...orgs, email: value });
        }}
      ></TextInput>
      <TouchableOpacity
        onPress={handleCadastroOrganizador}
        style={styles.button}
      >
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
