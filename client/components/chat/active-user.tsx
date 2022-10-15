import { User } from "whiteboard/user"

type Props = {
    user: User
}

export const ActiveUser: React.FC<Props> = ({ user }) => (
    <div className="flex items-center justify-center" style={{
        background: user.color,
        borderRadius: "100%",
        width: "30px",
        height: "30px"
    }}>
        <div>
            {user.name[0].toLocaleUpperCase()}
        </div>
    </div>
)