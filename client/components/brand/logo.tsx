import Image from "next/image";

const Logo = () => <Image alt="orimboard logo" width={30} height={35} src={"/logo.png"} />;

const BrandTitle = () => (
  <Image width={71} height={35} alt="orimboard brand title" src={"/brandtitle.png"} />
);

export const NavLogo = () => (
  <div className="flex">
    <Logo />
    <div className="relative pr-1" />
    <BrandTitle />
  </div>
);
