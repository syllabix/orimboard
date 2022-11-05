import Image from "next/image";

const Logo = () => <Image width={30} height={35} src={"/logo.png"} />;

const BrandTitle = () => (
  <Image width={71} height={35} src={"/brandtitle.png"} />
);

export const NavLogo = () => (
  <div className="flex">
    <Logo />
    <div className="relative pr-1" />
    <BrandTitle />
  </div>
);
