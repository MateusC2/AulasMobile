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
import DateTimePickero from "../components/DateTimePicker";

export default function CadastroEvento({ navigation }) {
  const [evento, setEvento] = useState({
    nome: "",
    descricao: "",
    data_hora: "",
    local: "",
    fk_id_organizador: "",
  });

  async function handleCadastroEvento() {
    await api.postCadastroEvento(evento).then(
      (response) => {
        console.log(response.data.message);
        Alert.alert("Sucesso", response.data.message);
        setEvento({ nome: "", descricao: "", data_hora: "", local: "", fk_id_organizador: "" });
      },
      (error) => {
        console.log(error.response.data.error);
        Alert.alert("Erro", error.response.data.error);
      }
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Evento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Evento"
        value={evento.nome}
        onChangeText={(value) => setEvento({ ...evento, nome: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição do Evento"
        multiline
        numberOfLines={3}
        value={evento.descricao}
        onChangeText={(value) => setEvento({ ...evento, descricao: value })}
      />

      <View style={styles.dateTimePickerContainer}>
        <DateTimePickero
          type={"date"}
          buttonTitle={evento.data_hora === "" ? "Data do Evento": evento.data_hora.toLocaleString()}
          setValue={setEvento}
          dateKey={"data_hora"}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Local do Evento"
        value={evento.local}
        onChangeText={(value) => setEvento({ ...evento, local: value })}
      />

      <TextInput
        style={styles.input}
        placeholder="ID do Organizador"
        keyboardType="numeric"
        value={evento.fk_id_organizador}
        onChangeText={(value) => setEvento({ ...evento, fk_id_organizador: value })}
      />
      <TouchableOpacity style={styles.cadastroButton} onPress={handleCadastroEvento}>
        <Text style={styles.cadastroButtonText}>Cadastrar Evento</Text>
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
  dateTimePickerContainer: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12, // Ajuste o padding vertical para alinhar com os inputs
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