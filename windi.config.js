import { defineConfig } from "windicss/helpers";

export default defineConfig({
	darkMode: "class",
	theme: {
		extend: {},
	},
	plugins: [
		require("windicss/plugin/aspect-ratio"),
		require("windicss/plugin/line-clamp"),
	],
});
