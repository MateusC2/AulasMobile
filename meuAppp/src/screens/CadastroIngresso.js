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
    fk_id_evento: "",
  });

  async function handleCadastroIngresso() {
    await api.postCadastroIngresso(ingresso).then(
      (response) => {
        console.log(response.data.message);
        Alert.alert("Sucesso", response.data.message);
        // Opcional: Limpar os campos após o cadastro bem-sucedido
        setIngresso({ preco: "", tipo: "", fk_id_evento: "" });
      },
      (error) => {
        console.log(error.response.data.error);
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Ingresso</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço do Ingresso"
        keyboardType="numeric"
        value={ingresso.preco}
        onChangeText={(value) => setIngresso({ ...ingresso, preco: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo de Ingresso (ex: VIP, Comum)"
        value={ingresso.tipo}
        onChangeText={(value) => setIngresso({ ...ingresso, tipo: value })}
      />
      <TextInput
        style={styles.input}
        placeholder="ID do Evento"
        keyboardType="numeric"
        value={ingresso.fk_id_evento}
        onChangeText={(value) => setIngresso({ ...ingresso, fk_id_evento: value })}
      />

      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastroIngresso}>
        <Text style={styles.cadastroButtonText}>Cadastrar Ingresso</Text>
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