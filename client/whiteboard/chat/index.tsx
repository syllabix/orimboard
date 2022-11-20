import { User } from "whiteboard/user";

export type ChatMessage = {
  id: string;
  text: string;
  sentAt: string;
  user?: User;
};
