import Button from "components/button";
import { ActiveUser } from "components/chat/active-user";
import { Message } from "components/chat/message";
import Icon from "components/icon/icon";
import { Card } from "components/layout/card";
import { Field, Form, Formik, FormikErrors } from "formik";
import { User } from "whiteboard/user";
import { ChatMessage } from "../../whiteboard/chat";
import { BoardAction } from "../../whiteboard/state/action";

type Props = {
  user: User;
  send: (msg: BoardAction) => void;
  users: {
    [id: string]: User;
  };
  messages: Array<ChatMessage>;
};

export const Messenger: React.FC<Props> = ({ send, user, users, messages }) => (
  <div className="absolute right-4 top-4 z-10 max-w-sm w-80">
    <Card className="flex justify-between">
      <Icon
        width={30}
        height={30}
        className="mr-2 fill-slate-300"
        kind="People"
      />
      <div className="flex justify-end space-x-1">
        {Object.values(users)
          .slice(0, 7)
          .map((user) => (
            <ActiveUser key={user.id} user={user} />
          ))}
      </div>
    </Card>
    <Card className="mt-4 relative">
      <div className="max-h-80 flex flex-col-reverse overflow-scroll before:content-[''] before:absolute before:bg-gradient-to-b">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <Message key={msg.sentAt} message={msg} />
          ))}
        </div>
      </div>
      <Formik
        initialValues={{ message: "" }}
        validate={(values) => {
          const errors = {} as FormikErrors<{ message: string }>;
          if (!values.message || values.message.trim().length < 1) {
            errors.message = "please type something";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          send({
            type: "chat",
            payload: {
              text: values.message.trim(),
              sentAt: new Date().toISOString(),
              user,
            },
          });
          resetForm();
        }}
      >
        <Form className="flex">
          <Field
            className="input w-full mr-2"
            name="message"
            placeholder="say something..."
          />
          <Button type="submit">send</Button>
        </Form>
      </Formik>
    </Card>
  </div>
);
