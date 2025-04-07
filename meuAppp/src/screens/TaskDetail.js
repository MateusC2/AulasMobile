import React from "react";
import { View, Text } from "react-native";

export default function TaskDetail({ route }) {
  const { task } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detalhes da Tarefa: {task.tittle}</Text>
      <Text>Data: {task.date}</Text>
      <Text>Hora: {task.time}</Text>
      <Text>Local: {task.address}</Text>
    </View>
  );
}
