import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList, User } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";

// Login screen component
const LoginScreen = () => {
  // Access setUser function from AppContext
  const { setUser } = useContext(AppContext);

  // Navigation hook to handle navigation actions
  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();

  // Function to handle user login
  const handleLogin = async (user: User) => {
    if (setUser) {
      setUser(user);
    }
    navigation.navigate("Chat");
  };

  // *token generation(Login) should be done using api, but due to lack of server, I've statically placed token for the users *//
  const users: User[] = [
    {
      userId: "vikas",
      userName: "Vikas Chhabra",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmlrYXMifQ.e1b_CeRS2PY2L7cH34Fo8ZHOeGP7B-cdXaNytmK-Ot0",
    },
    {
      userId: "kashif",
      userName: "Kashif",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia2FzaGlmIn0.1nrr_pIhFDai8Lz9V7mpR2sV2WHnxI0Us5cfOxi9nyQ",
    },
  ];

  return (
    <LinearGradient
      colors={["#999", "#333", "#000"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Welcome Back!</Text>
        {users?.map((user, index) => {
          const isLast = index === users?.length - 1;
          return (
            <TouchableOpacity
              key={user.userId}
              onPress={() => {
                handleLogin(user);
              }}
              style={[
                styles.userContainer,
                {
                  borderBottomWidth: isLast ? 0 : 1,
                },
              ]}
            >
              <Image
                source={require("../../../assets/icon.png")}
                style={styles.userIcon}
              />

              <Text style={styles.userName}>{user.userName}</Text>

              <Ionicons name="chevron-forward-outline" size={24} color="#fff" />
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,

    borderBottomColor: "#CCCCCC",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
    color: "#fff",
  },
});

export default LoginScreen;
