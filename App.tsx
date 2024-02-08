import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllChats from "./src/screens/allChats";
import ChatRoom from "./src/screens/chatRoom";
import { ChatHOC } from "./src/components/ChatParent";
import { AppProvider } from "./src/context/AppContext";
import LoginScreen from "./src/screens/login";
import { AppStackParamList } from "./src/types";

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {
  const ChatStack = () => {
    return (
      <ChatHOC>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={AllChats} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
        </Stack.Navigator>
      </ChatHOC>
    );
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Chat" component={ChatStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
