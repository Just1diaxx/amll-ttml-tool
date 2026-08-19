import { defineConfig } from "i18next-cli";

export default defineConfig({
	locales: [
		"zh-CN",
		"en-US",
		"cs-CZ",
		"da-DK",
		"es-ES",
		"fr-FR",
		"id-ID",
		"pl-PL",
		"pt-BR",
		"ru-RU",
		"sk-SK",
	],
	extract: {
		input: "src/**/*.{js,jsx,ts,tsx}",
		ignore: ["**/wasm/**", "**/vendor/**"],
		output: "locales\\{{language}}\\{{namespace}}.json",

		sort: false,

		defaultValue: (key, _namespace, _language, value) => {
			return value || key;
		},

		disablePlurals: true,
	},
});
