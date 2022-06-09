import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface ICodeEditorProps {
	initialValue?: string;
	onChange: (value: string) => void;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue, onChange }) => {
	const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
	};
	return (
		<MonacoEditor
			value={initialValue}
			editorDidMount={onEditorDidMount}
			height={300}
			language="javascript"
			theme="dark"
			options={{
				minimap: { enabled: false },
				wordWrap: "on",
				showUnused: false,
				folding: false,
				lineNumbersMinChars: 3,
				fontSize: 16,
				scrollBeyondLastLine: false,
				automaticLayout: true,
			}}
		></MonacoEditor>
	);
};

export default CodeEditor;
