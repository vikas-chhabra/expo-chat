import React, { PropsWithChildren, useContext, useEffect } from "react";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { STREAM_API_KEY } from "../constants/creds";
import { useClient } from "../hooks/useClient";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { AppContext } from "../context/AppContext";

// Higher-order component for initializing and managing chat functionality
export const ChatHOC = ({ children }: PropsWithChildren<{}>) => {
  // Access user data from the application context
  const { user } = useContext(AppContext);

  const { chatClient, initiateConnection } = useClient();

  // Effect hook to initiate connection when user data changes
  useEffect(() => {
    if (user) {
      initiateConnection({
        apiKey: STREAM_API_KEY,
        userData: { id: user.userId },
        tokenOrProvider: user.token,
      });
    }
  }, [user]);

  // Render loading indicator while chat client is being initialized
  if (!chatClient) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // Render chat component when chat client is initialized
  return (
    <OverlayProvider>
      <Chat client={chatClient as any} enableOfflineSupport={false}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
