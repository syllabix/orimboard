import { User } from "whiteboard/user";

type Props = {
  size?: number;
  user: User;
};

export const ActiveUser: React.FC<Props> = ({ size = 30, user }) => (
  <div
    className="flex items-center justify-center"
    style={{
      background: user.color,
      borderRadius: "100%",
      width: size + "px",
      height: size + "px",
    }}
  >
    <div>{user.name[0].toLocaleUpperCase()}</div>
  </div>
);
