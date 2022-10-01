import { NavLogo } from "../brand/logo";

type Props = {
    boardname: string;
}

export const BoardNav: React.FC<Props> = ({ boardname }) => (
    <div className="absolute w-full flex justify-between content-center p-4 z-10">
        <div className="bg-slate-600 shadow-lg rounded-md p-2 flex content-center">
            <NavLogo />
            {/* <h2 className="border-l-2 ml-3 pl-3 pr-2 py-1 text-xl font-semibold">{boardname}</h2> */}
        </div>
    </div>
)

