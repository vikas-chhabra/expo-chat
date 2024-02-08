import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { AppContext } from "../../../context/AppContext";
import {
  ChannelPreviewMessengerProps,
  DefaultStreamChatGenerics,
  useChannelPreviewDisplayName,
} from "stream-chat-expo";
import { AppStackParamList } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";

const ChannelItem = (
  props: ChannelPreviewMessengerProps<DefaultStreamChatGenerics>
) => {
  // Extract last message preview and other data from props
  const lastMessagePreview = props?.latestMessagePreview || {};
  const allPreviews = lastMessagePreview?.previews || [];
  const previewsLength = allPreviews?.length;
  const lastMessageText =
    previewsLength > 0 ? allPreviews[allPreviews?.length - 1]?.text : " - ";

  // Access setChannel function from AppContext
  const { setChannel } = useContext(AppContext);
  const title = useChannelPreviewDisplayName(props.channel);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList>>();

  // Function to open chat room
  const openRoom = () => {
    // Set current channel and navigate
    if (setChannel && props?.channel) {
      setChannel(props.channel as any);
      navigation.navigate("ChatRoom");
    }
  };

  return (
    <TouchableOpacity
      style={[styles.chatItem, styles.itemDivider]}
      onPress={openRoom}
    >
      <Image
        source={require("../../../../assets/icon.png")}
        style={styles.userImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{title}</Text>
        <Text style={styles.lastMessage}>{lastMessageText}</Text>
      </View>
      <Text style={styles.lastMessageTime}>
        {lastMessagePreview?.created_at?.toString()}
      </Text>
    </TouchableOpacity>
  );
};

export default ChannelItem;

// Styles for the component
const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  lastMessage: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
  lastMessageTime: {
    fontSize: 12,
    color: "#888",
  },
  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
});
