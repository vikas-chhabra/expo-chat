import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MessageHeaderTitle } from "../../../types";

// Message header component
export default function MessageHeader({ title }: MessageHeaderTitle) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.nameContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Navigate back on press
          style={styles.backContainer}
        >
          {/* Back button icon */}
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Header title */}
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 50,
    borderBottomColor: "#ccc",
    ...Platform.select({
      android: {
        marginTop: 40,
      },
    }),
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  backContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
