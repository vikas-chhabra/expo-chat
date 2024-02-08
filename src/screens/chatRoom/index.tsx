import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Channel,
  MessageList,
  MessageInput,
  useMessageInputContext,
  useChannelPreviewDisplayName,
} from "stream-chat-expo";
import { SendButton } from "stream-chat-react-native-core/src/components/MessageInput/SendButton";

import { AppContext } from "../../context/AppContext";
import MessageHeader from "./components/Header";

export default function ChannelScreen() {
  const currentDate = new Date();

  // Access setUser function from AppContext
  const { channel }: { channel: any } = useContext(AppContext);
  const title = useChannelPreviewDisplayName(channel);

  // State to track cooldown end time
  const [coolDownEndDate, setCoolDownEndDate] = useState(currentDate);

  if (!channel) {
    return <Text>Loading</Text>;
  }

  // Handler function for sending message
  const onSend = () => {
    const now = new Date();
    setCoolDownEndDate(new Date(now.getTime() + 10000));
  };

  return (
    <SafeAreaView>
      {channel && (
        <Channel
          channel={channel}
          additionalKeyboardAvoidingViewProps={{ enabled: false }}
        >
          <View style={{ flex: 1 }}>
            <MessageHeader title={title} />
            <MessageList />

            {/* Keyboard avoiding view for message input */}
            <KeyboardAvoidingView
              style={styles.inputContainer}
              behavior="padding"
              enabled={Platform.OS === "ios"}
              keyboardVerticalOffset={50}
            >
              {/* Message input component */}
              <MessageInput
                cooldownEndsAt={coolDownEndDate}
                SendButton={() => {
                  return <CustomSendButton onSend={onSend} />;
                }}
              />
            </KeyboardAvoidingView>
          </View>
        </Channel>
      )}
    </SafeAreaView>
  );
}

// Custom send button component
const CustomSendButton = ({ onSend }: { onSend: () => void }) => {
  const { sendMessage } = useMessageInputContext();

  // Handler function for sending message
  const handleSendMessage = async () => {
    sendMessage();
    onSend();
  };

  return <SendButton sendMessage={handleSendMessage} />; // Render send button
};

// Styles for the component
const styles = StyleSheet.create({
  flex: { flex: 1 },
  fullWidth: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {},
});
