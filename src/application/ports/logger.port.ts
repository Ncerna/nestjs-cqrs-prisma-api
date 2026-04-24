export interface ILogger {
  log(message: string, context?: any): void;
  error(message: string, trace?: any): void;
  warn(message: string): void;
}