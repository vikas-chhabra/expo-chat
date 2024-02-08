import React, { PropsWithChildren, createContext, useState } from "react";
import { Channel as ChannelType } from "stream-chat";
import { User } from "../types";
import { DefaultStreamChatGenerics } from "stream-chat-expo";

export type AppContextType = {
  channel: ChannelType<DefaultStreamChatGenerics> | undefined;
  setChannel?: React.Dispatch<
    React.SetStateAction<ChannelType<DefaultStreamChatGenerics> | undefined>
  >;
  user: User | undefined;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
};

// Create a context for the application state
export const AppContext = createContext<AppContextType>({
  channel: undefined, // Current channel in the application

  user: undefined, // Current user in the application
});

// Provider component to manage the application state
export const AppProvider = ({ children }: PropsWithChildren) => {
  const [channel, setChannel] = useState<
    ChannelType<DefaultStreamChatGenerics> | undefined
  >(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  // Return the provider component with the application context value
  return (
    <AppContext.Provider value={{ channel, setChannel, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
