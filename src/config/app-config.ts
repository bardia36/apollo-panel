export default function useAppConfig() {
  return {
    get protocol(): string {
      return import.meta.env.VITE_APP_SSL === "true" ? "https://" : "http://";
    },

    get apiServerUrl(): string {
      return `${this.protocol}${import.meta.env.VITE_APP_API_SERVER || "localhost:8000"}/api`;
    },

    get authenticationServerUrl(): string {
      return `${this.protocol}${import.meta.env.VITE_APP_AUTHENTICATION_API_SERVER || "localhost:8080"}/api`;
    },

    get fileServerUrl(): string {
      return `${this.protocol}${import.meta.env.VITE_APP_FILE_SERVER || "localhost:8080"}/unsafe`;
    },
  };
}
