import * as esBuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

let bundler: esBuild.Service;

const bundle = async (rawCode: string) => {
	if (!bundler) {
		bundler = await esBuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		});
	}

	// just transpile
	/*const result = await esBuildServiceRef.current.transform(input, {
			loader: "jsx",
			target: "es2015",
	});*/

	const result = await bundler.build({
		entryPoints: ["index.js"],
		bundle: true,
		write: false,
		plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
		define: {
			"process.env.NODE_ENV": '"production"',
			global: "window",
		},
	});

	return result.outputFiles[0].text;
};

export default bundle;
