import React from "react";
import { SVGProps } from "react";
import icons from "components/icon/icons";

import IconKind from "components/icon/icon-kind";

type Props = {
  kind: IconKind;
  className?: string;
} & SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ kind, ...props }) => {
  const Icon = icons[kind];
  return <Icon {...props} />;
};

export default Icon;
