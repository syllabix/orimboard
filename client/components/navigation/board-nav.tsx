import { NavLogo } from "../brand/logo";

type Props = {
  boardname: string;
};

export const BoardNav: React.FC<Props> = ({ boardname }) => (
  <div className="absolute flex justify-between content-center p-4 z-10">
    <div className="bg-slate-600 shadow-lg rounded-md p-2 flex content-center">
      <NavLogo />
    </div>
  </div>
);
