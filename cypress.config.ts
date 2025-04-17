import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
	},

	e2e: {
		baseUrl: "http://localhost:3000",
		setupNodeEvents(on, config) {
			
		},
	},
	// reporter: "mochawesome",
	// reporterOptions: {
	// 	reportDir: "cypress/results",
	// 	overwrite: false,
	// 	html: false,
	// 	json: true,
	// },
});
