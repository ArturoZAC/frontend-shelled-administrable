type EnvsType = {
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;

  VITE_API_URL: string;
  VITE_API_URL_BASE: string;
};

export const getEnvs = () => {
  const envs = import.meta.env as EnvsType;

  return {
    ...envs,
  };
};
