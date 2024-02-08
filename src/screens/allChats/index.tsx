import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";

import { ChannelList, DefaultStreamChatGenerics } from "stream-chat-expo";
import ChannelItem from "./components/ChannelItem";
import LoadingChannels from "./components/LoadingChannels";
import { AppContext } from "../../context/AppContext";
import { ChannelFilters, ChannelSort } from "stream-chat";

const sort = { last_updated: -1 };
const options = {
  state: true,
  watch: true,
};

const AllChats = () => {
  const { user } = useContext(AppContext);

  const filters = {
    members: { $in: [user?.userId] },
    type: "messaging",
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Chats</Text>
        <ChannelList
          Preview={ChannelItem}
          options={options}
          sort={sort as ChannelSort<DefaultStreamChatGenerics>}
          filters={filters as ChannelFilters<DefaultStreamChatGenerics>}
          Skeleton={LoadingChannels}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    ...Platform.select({
      android: {
        paddingTop: 40,
      },
    }),
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default AllChats;
