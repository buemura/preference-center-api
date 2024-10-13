export interface ILogger {
  info(message: any): void;
  error(message: any): void;
}

export interface IloggerProps {
  level?: string;
}
