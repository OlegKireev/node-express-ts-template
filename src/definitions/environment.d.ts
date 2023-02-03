export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_CONNECT: string;
      JWT_SECRET: string;
    }
  }
}
