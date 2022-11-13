import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const additionalData = `@import "./src/assets/scss/global";`;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData,
            },
        },

        modules: {
            localsConvention: "camelCaseOnly",
        },
    },

    resolve: {
        alias: {
            "~": resolve(__dirname, "src"),
            "@": resolve(__dirname, "src", "components"),
        },

        extensions: [".js", ".ts", ".jsx", ".tsx"],
    },
});
