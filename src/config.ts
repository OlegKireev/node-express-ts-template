interface IConfig {
  authorizationExpired?: string | number;
}

export const CONFIG: IConfig = {
  authorizationExpired: '1 day',
};
