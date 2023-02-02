export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_CONNECT: string;
    }
  }
}
