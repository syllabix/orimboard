import { ActiveUser } from "components/chat/active-user"
import TimeDisplay from "components/format/date"
import { ChatMessage } from "whiteboard/chat"

type Props = {
    message: ChatMessage,
}

export const Message: React.FC<Props> = ({ message }) => (
    <div className="bg-slate-500 rounded-md p-2 mb-2">
        <div className="flex justify-between">
            {message.user && (
                <ActiveUser size={20} user={message.user} />
            )}
            <TimeDisplay date={message.sentAt} />
        </div>
        <p>
            {message.text}
        </p>
    </div>
)