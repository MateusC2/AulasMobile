import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Button
} from "react-native";
import api from "../axios/axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Cadastro() {
    const navigation = useNavigation();
    const [user, setUser] = useState({
        name: "",
        cpf: "",
        email: "",
        password: "",
        data_nascimento: "",
    });

    async function handleCadastro() {
        await api.postCadastro(user).then(
            (response) => {
                console.log(response.data.message);
                Alert.alert("Sucesso", response.data.message);
                navigation.navigate("Login");
            },
            (error) => {
                console.log(error.response.data.error);
                Alert.alert("Erro", error.response.data.error);
            }
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua conta</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={user.name}
                    onChangeText={(value) => setUser({ ...user, name: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="id-card-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    keyboardType="numeric"
                    value={user.cpf}
                    onChangeText={(value) => setUser({ ...user, cpf: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={user.email}
                    onChangeText={(value) => setUser({ ...user, email: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={user.password}
                    onChangeText={(value) => setUser({ ...user, password: value })}
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Data de nascimento (DD/MM/AAAA)"
                    keyboardType="numeric"
                    value={user.data_nascimento}
                    onChangeText={(value) => setUser({ ...user, data_nascimento: value })}
                />
            </View>
            <TouchableOpacity onPress={handleCadastro} style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Voltar para Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  registerButton: {
    backgroundColor: "#007bff", // Cor verde para cadastro
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007bff", // Cor azul para voltar ao login
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});