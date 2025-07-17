import { ReactNode } from 'react';

type AlertKind = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  kind: AlertKind;
  children: ReactNode;
}

const typeClasses: Record<AlertKind, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

export const Alert = ({ kind: type, children }: AlertProps) => {
  return (
    <div className={`alert ${typeClasses[type]}`}>
      <div className="alert-content">{children}</div>
    </div>
  );
}; 