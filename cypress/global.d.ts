declare module "./reporter/custom-reporter" {
	import { ReporterConstructor } from "mocha";
	const CustomReporter: ReporterConstructor;
	export = CustomReporter;
}
