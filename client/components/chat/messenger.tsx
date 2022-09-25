import { ChatMessage } from "../../whiteboard/chat"
import { BoardUpdate } from "../../whiteboard/state/action"

type Props = {
    send: (msg: BoardUpdate) => void,
    messages: Array<ChatMessage>,
}

export const Messenger: React.FC<Props> = ({ send, messages }) => (
    <div className="absolute right-4 h-screen top-4 z-10">
        <div className="bg-slate-600 shadow-lg rounded-md p-2 flex content-center">
            <h2 className="text-xl font-semibold">chat</h2>
        </div>
        <div className="bg-slate-600 shadow-lg rounded-md p-2 mt-4">
            <div className="rounded-md w-44">
                {messages.map(msg => (
                    <p className="p-1 rounded-md bg-slate-300">
                        {msg.text}
                    </p>
                ))}
            </div>
        </div>
    </div>
)