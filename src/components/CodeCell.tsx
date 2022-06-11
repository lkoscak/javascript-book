import { useState } from "react";
import bundle from "../bundler";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

const CodeCell = () => {
	const [input, setInput] = useState("");
	const [code, setCode] = useState("");

	const onSubmit = async () => {
		const result = await bundle(input);
		setCode(result);
	};

	return (
		<>
			<CodeEditor
				initialValue="const a = 1"
				onChange={(value) => {
					setInput(value);
				}}
			></CodeEditor>
			<div>
				<button onClick={onSubmit}>Submit</button>
			</div>
			<Preview code={code}></Preview>
		</>
	);
};

export default CodeCell;
