export default function useAppConfig() {
  return {
    get protocol(): string {
      return import.meta.env.VITE_APP_SSL === "true" ? "https://" : "http://";
    },

    get apiServerUrl(): string {
      return `${this.protocol}${import.meta.env.VITE_APP_API_SERVER || "cipapi-test.asanbime.app"}/api`;
    },
  };
}
