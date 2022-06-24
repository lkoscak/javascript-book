import "./code-editor.css";
import React, { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

interface ICodeEditorProps {
	initialValue?: string;
	onChange: (value: string) => void;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue, onChange }) => {
	const monacoEditorRef = useRef<any>(null);
	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		monacoEditorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
	};
	const onFormatClick = () => {
		const value = monacoEditorRef.current.getModel().getValue();
		const formattedValue = prettier
			.format(value, {
				parser: "babel",
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, "");
		monacoEditorRef.current.setValue(formattedValue);
	};
	return (
		<div className="editor-wrapper">
			<button
				className="button button-format is-primary is-small"
				onClick={onFormatClick}
			>
				Format
			</button>
			<MonacoEditor
				value={initialValue}
				editorDidMount={onEditorDidMount}
				height="100%"
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
		</div>
	);
};

export default CodeEditor;
