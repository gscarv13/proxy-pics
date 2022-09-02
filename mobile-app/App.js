import { Provider } from 'react-redux'
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from './redux/store';

import Home from "./screens/Home";
import SignIn from "./screens/SignIn";
import Order from './screens/Order';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Order" component={Order}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
