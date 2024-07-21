declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      NEXTAUTH_SECRET: string;
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      NEXTAUTH_URL: string;
      CLOUDINARY_URL: string;
      GA_ID: string;
      IMGBB_KEY: string;
      APP_ENV: "development" | "staging" | "production";
      [key: string]: string | undefined;
    }
  }
}

export {};
