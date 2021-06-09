export interface AlertAction {
  label: string;
  callback: () => void;
}

export interface Alert {
  message: string;
  severity?: 'error' | 'warning' | 'info';
  action?: AlertAction;
}
