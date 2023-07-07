import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export default defineConfig({
  plugins: [react()],
  define: {
    __API_URL__: `"${process.env.REACT_APP_API_URL}"`,
  },
});
