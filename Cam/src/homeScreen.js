import React, { useState, useEffect } from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import api from "./axios/axios";

const HomeScreen = () => {
  const [isAlarmArmed, setIsAlarmArmed] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  const navigation = useNavigation();
  const isFocused = useIsFocused(); 

  const handleCam = () => {
    navigation.navigate("Cam");
  };

  async function fetchInitialAlarmState() {
    setIsLoading(true);
    try {
      const response = await api.getAlarmState();
      const lastValue = response.data.value; 
      
      const isArmed = lastValue === 'true'; 
      
      setIsAlarmArmed(isArmed);
      setIsLoading(false); 

    } catch (error) {
      console.log("Erro ao sincronizar estado inicial:", error.message);
      setIsAlarmArmed(false); 
      setIsLoading(false); 
    }
  }


  useEffect(() => {
    if (isFocused) {
      fetchInitialAlarmState();
    }
  }, [isFocused]);

  // Função para alternar o estado do alarme (POST)
  async function alarmToggle() {
    if (isLoading) return; 

    const newValue = !isAlarmArmed;
    setIsLoading(true);

    try {
      // 1. Prepara e envia o novo estado como string para a API
      const stateToSend = newValue ? 'true' : 'false'; 
      await api.toggleAlarm({ value: stateToSend }); 
      
      // 2. Atualiza o estado local apenas após o sucesso
      setIsAlarmArmed(newValue);
      setIsLoading(false); 

    } catch(error){
      console.log("Erro ao alternar alarme", error.message);
      setIsLoading(false); 
    }
  }

  // Exibe um indicador de carregamento enquanto o estado inicial é null ou carregando
  if (isAlarmArmed === null || isLoading) {
      return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{marginBottom: 10}}>Sincronizando estado do Alarme...</Text>
              <ActivityIndicator size="large" color="blue" />
          </View>
      );
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
          title={isAlarmArmed ? "Desarmar Alarme" : "Armar Alarme"}
          onPress={alarmToggle}
          color={isAlarmArmed ? "red" : "green"}
          disabled={isLoading}
        />
      </View>
      <View style={{marginTop:20}}>
        <Button title="Listar Eventos" onPress={() => navigation.navigate("Eventos")} />
      </View>
    </View>
  );
};
export default HomeScreen;