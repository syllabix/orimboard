import { ActiveUser } from "components/chat/active-user";
import TimeDisplay from "components/format/date";
import { ChatMessage } from "whiteboard/chat";

type Props = {
  message: ChatMessage;
};

export const Message: React.FC<Props> = ({ message }) => (
  <div className="bg-slate-500 rounded-md p-2 mb-2">
    <div className="flex justify-between">
      {message.user && (
        <span className="flex items-center">
          <ActiveUser size={20} user={message.user} />
          <p className="ml-1 text-xs">{message.user?.name}</p>
        </span>
      )}
      <TimeDisplay date={message.sentAt} />
    </div>
    <p>{message.text}</p>
  </div>
);
