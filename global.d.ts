export {};

declare global {
  interface Window {
    onTelegramAuth: (user: IUser) => void;
  }
}
