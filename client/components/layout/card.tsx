import { ReactNode } from "react"

type Props = {
    className?: string
    children?: ReactNode
}

export const Card: React.FC<Props> = ({ className = "", children }) => (
    <div className={`bg-slate-600 shadow-lg rounded-md p-2 ${className}`}>
        {children}
    </div>
)