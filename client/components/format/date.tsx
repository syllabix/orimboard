import React, { FC, useMemo } from "react";

const format = (date: string, locale: string) => {
  const dateTimeFormat = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "numeric",
  });
  try {
    return dateTimeFormat.format(new Date(date));
  } catch {
    return "--";
  }
};

type Props = {
  date: string;
  locale?: string;
};

const TimeDisplay: FC<Props> = ({ date, locale = "en-GB" }) => {
  const formatted = useMemo(() => format(date, locale), [date, locale]);
  return <>{formatted}</>;
};

export default TimeDisplay;
