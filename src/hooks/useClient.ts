import { useEffect, useState } from "react";
import { DefaultGenerics, StreamChat } from "stream-chat";
import { InitConnectionType } from "../types";

/**
 * A custom hook to manage the Stream Chat client.
 * @returns {Object} An object containing the chatClient and initiateConnection function.
 */
export const useClient = () => {
  // State variables to hold the chat client and connection promise
  const [chatClient, setChatClient] =
    useState<StreamChat<DefaultGenerics> | null>(null);
  const [connectionPromise, setConnectionPromise] = useState<any>(null);

  /**
   * Initiates a connection with the Stream Chat client.
   * @param {Object} config - Configuration object containing apiKey, userData, and tokenOrProvider.
   */
  const initiateConnection = ({
    apiKey,
    userData,
    tokenOrProvider,
  }: InitConnectionType) => {
    const client = new StreamChat(apiKey);

    if (!userData || !tokenOrProvider) {
      return;
    }

    let connectionPromise = client
      .connectUser(userData, tokenOrProvider)
      .then(async (response) => {
        setChatClient(client);
      });
    setConnectionPromise(connectionPromise);
  };

  /**
   * Disconnects the user from the Stream Chat client.
   */
  const disconnectUser = () => {
    setChatClient(null);
    connectionPromise
      ?.then(() => connectionPromise?.disconnectUser())
      .then(() => {
        setConnectionPromise(null);
      });
  };

  useEffect(() => {
    return () => {
      disconnectUser();
    };
  }, []);

  // Return the chatClient and initiateConnection function
  return { chatClient, initiateConnection };
};
