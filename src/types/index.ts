export type LocalAttachmentType = Record<string, unknown>;
export type LocalChannelType = Record<string, unknown>;
export type LocalCommandType = string;
export type LocalEventType = Record<string, unknown>;
export type LocalMessageType = Record<string, unknown>;
export type LocalReactionType = Record<string, unknown>;
export type LocalUserType = Record<string, unknown>;

export type StreamChatGenerics = {
  attachmentType: LocalAttachmentType;
  channelType: LocalChannelType;
  commandType: LocalCommandType;
  eventType: LocalEventType;
  messageType: LocalMessageType;
  reactionType: LocalReactionType;
  userType: LocalUserType;
};

export type User = {
  userId: string;
  userName: string;
  token: string;
};

export type InitConnectionType = {
  apiKey: string;
  userData: {
    id: string;
  };
  tokenOrProvider: string;
};

export type MessageHeaderTitle = {
  title: string;
};

export type AppStackParamList = {
  Login: undefined;
  Chat: undefined;
  Home: undefined;
  ChatRoom: undefined;
};
