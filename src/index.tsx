import ReactDOM from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import * as esBuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/CodeEditor";

const App = () => {
	const [input, setInput] = useState("");
	const esBuildServiceRef = useRef<any>(null);
	const iframeRef = useRef<any>(null);

	const startService = async () => {
		esBuildServiceRef.current = await esBuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!esBuildServiceRef.current) return;
		/* const result = await esBuildServiceRef.current.transform(input, {
			loader: "jsx",
			target: "es2015",
		}); */
		//setCode(result.code);
		iframeRef.current.srcdoc = html;
		const result = await esBuildServiceRef.current.build({
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				"process.env.NODE_ENV": '"production"',
				global: "window",
			},
		});
		//setCode(result.outputFiles[0].text);
		iframeRef.current.contentWindow.postMessage(
			result.outputFiles[0].text,
			"*"
		);
	};

	const html = `
		<html>
		<head></head>
		<body>
			<div id="root"></div>
			<script>
				window.addEventListener('message', (event) =>{
					console.log(event.data)
					try{
						eval(event.data)
					}catch(error){
						const root = document.querySelector('#root')
						root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'
						console.error(error)
					}
				}, false);
			</script>
		</body>
	</html>
	`;

	return (
		<>
			<CodeEditor
				initialValue="const a = 1"
				onChange={(value) => {
					setInput(value);
				}}
			></CodeEditor>
			<textarea
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				cols={30}
				rows={10}
			></textarea>
			<div>
				<button onClick={onSubmit}>Submit</button>
			</div>
			{/*<iframe sandbox="" title="test" src="/test.html" frameBorder="0"></iframe>  */}
			{/* <iframe
				sandbox="allow-scripts"
				title="test"
				srcDoc={html}
				frameBorder="1"
			></iframe> */}
			<iframe
				ref={iframeRef}
				title="code preview"
				frameBorder="1"
				srcDoc={html}
				sandbox="allow-scripts"
			></iframe>
		</>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
