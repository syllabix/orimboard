import Button from "components/button"
import { ActiveUser } from "components/chat/active-user"
import Icon from "components/icon/icon"
import { Card } from "components/layout/card"
import { Field, Form, Formik } from "formik"
import { User } from "whiteboard/user"
import { ChatMessage } from "../../whiteboard/chat"
import { BoardAction } from "../../whiteboard/state/action"

type Props = {
    send: (msg: BoardAction) => void,
    users: {
        [id: string]: User,
    }
    messages: Array<ChatMessage>,
}

export const Messenger: React.FC<Props> = ({ send, users, messages }) => (
    <div className="absolute right-4 top-4 z-10">
        <Card className="flex justify-between">
            <Icon width={30} height={30} className="mr-2 fill-slate-300" kind="People" />
            <div className="flex justify-end space-x-1">
            {Object.values(users).slice(0, 7).map(user => (
                <ActiveUser key={user.id} user={user} />
            ))}
            </div>
        </Card>
        <Card className="mt-4">
            <div className="rounded-md">
                {messages.map(msg => (
                    <p key={msg.sentAt} className="p-1 rounded-md bg-slate-300 my-2 text-slate-900">
                        {msg.text}
                    </p>
                ))}
            </div>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { resetForm }) => {
                    send({
                        type: 'chat',
                        payload: {
                            text: values.message,
                            sentAt: new Date().toISOString()
                        }
                    })
                    resetForm();
                }}
            >
                <Form>
                    <Field className="input mr-2" name="message" placeholder="say something..." />
                    <Button type="submit">send</Button>
                </Form>
            </Formik>
        </Card>

    </div>
)