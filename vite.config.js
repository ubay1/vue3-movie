/* eslint-disable no-undef */
import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import WindiCSS from "vite-plugin-windicss";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());

	const processEnvValues = {
		"process.env": Object.entries(env).reduce((prev, [key, val]) => {
			return {
				...prev,
				[key]: val,
			};
		}, {}),
	};

	return {
		plugins: [vue(), WindiCSS()],
		define: processEnvValues,
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
	};
});
