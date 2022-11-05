import { User } from "whiteboard/user";

export type ChatMessage = {
  text: string;
  sentAt: string;
  user?: User;
};
