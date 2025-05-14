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
        Alert.alert("Sucesso", response.data.message);
        // Opcional: Limpar os campos após o cadastro bem-sucedido
        setOrg({ nome: "", senha: "", email: "", telefone: "" });
      },
      (error) => {
        console.log(error.response.data.error);
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Organizador</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Organizador"
        value={orgs.nome}
        onChangeText={(value) => setOrg({ ...orgs, nome: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry // Para ocultar a senha
        value={orgs.senha}
        onChangeText={(value) => setOrg({ ...orgs, senha: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={orgs.telefone}
        onChangeText={(value) => setOrg({ ...orgs, telefone: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={orgs.email}
        onChangeText={(value) => setOrg({ ...orgs, email: value })}
      />

      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastroOrganizador}>
        <Text style={styles.cadastroButtonText}>Cadastrar Organizador</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.voltarButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.voltarButtonText}>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  cadastroButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  cadastroButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  voltarButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  voltarButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});