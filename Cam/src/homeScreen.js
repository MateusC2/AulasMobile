import React from "react";
import { View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import api from "./axios/axios";

const HomeScreen = () => {
  const [stateLed, setStateLed] = useState({ value: false });
  const navigation = useNavigation();

  const handleCam = () => {
    navigation.navigate("Cam");
  };

  async function ledToggle() {
    try {
      //Faz a requisição da API do Adafruit
      const response = await api.toggleLED({ value: `${!stateLed.value}` });
      setStateLed({value: !stateLed.value})
      console.log("Resposta: ", response.data);
    } catch(error){
      console.log("Erro", error.response.data)
    }
  }

  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ marginBottom: 20 }}>
        <Button title="Abrir Câmera" onPress={handleCam} color="blue" />
      </View>

      <View>
        <Button
          title={stateLed.value ? "Desligar Led" : "Ligar Led"}
          onPress={ledToggle}
          color={stateLed.value ? "red" : "green"}
        />
      </View>
    </View>
  );
};
export default HomeScreen;
