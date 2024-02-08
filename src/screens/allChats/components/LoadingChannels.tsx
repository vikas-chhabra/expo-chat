import React from "react";
import { View, StyleSheet } from "react-native";

const ChannelSkeleton = () => {
  return (
    <View style={styles.chatItem}>
      <View style={styles.userContainer}>
        <View style={styles.userImage} />
        <View>
          <View style={styles.userName} />
          <View style={styles.lastMessage} />
        </View>
      </View>
      <View style={styles.lastMessageTimestamp} />
    </View>
  );
};

export default ChannelSkeleton;

// Styles for the component
const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#eee",
    marginRight: 15,
  },
  userName: {
    height: 14,
    width: 50,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  lastMessage: {
    height: 10,
    marginTop: 7,
    width: 80,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  lastMessageTimestamp: {
    height: 8,
    width: 40,
    backgroundColor: "#eee",
    borderRadius: 4,
  },
});
