import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    entry: "./src/server.ts",
    preset: "vercel",
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths(),
    ],
  },
});
