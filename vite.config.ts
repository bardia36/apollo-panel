import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core dependencies
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-core";
          }

          // Router related
          if (id.includes("react-router") || id.includes("react-router-dom")) {
            return "routing";
          }

          // Animation related
          if (id.includes("framer-motion")) {
            return "animations";
          }

          // UI Components
          if (id.includes("@heroui/")) {
            return "ui-components";
          }

          // Data management
          if (id.includes("@tanstack/react-query") || id.includes("zustand")) {
            return "data-management";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
      },
    },
  },
});
