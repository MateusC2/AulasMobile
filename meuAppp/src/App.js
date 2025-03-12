import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";
import Home from "./screens/Home"
import CadastroEvento from "./screens/CadastroEvento";
import CadastroIngresso from "./screens/CadastroIngresso";
import CadastroOrganizador from "./screens/CadastroOrganizador";

// import CadastroIngresso from "./screens/CadastroIngresso";
// import CadastroOrganizador from "./screens/CadastroOrganizador";
// import CadastroEvento from "./screens/CadastroEvento";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroEvento" component={CadastroEvento} />
        <Stack.Screen name="CadastroOrganizador" component={CadastroOrganizador} />
        <Stack.Screen name="CadastroIngresso" component={CadastroIngresso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
