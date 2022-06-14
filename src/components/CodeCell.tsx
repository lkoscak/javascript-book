import { useState, useEffect } from "react";
import bundle from "../bundler";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";

const CodeCell = () => {
	const [input, setInput] = useState("");
	const [code, setCode] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const timer: any = setTimeout(async () => {
			const result = await bundle(input);
			setCode(result.code);
			setError(result.err);
		}, 750);
		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue="const a = 1"
						onChange={(value) => {
							setInput(value);
						}}
					></CodeEditor>
				</Resizable>
				<Preview code={code} error={error}></Preview>
			</div>
		</Resizable>
	);
};

export default CodeCell;
