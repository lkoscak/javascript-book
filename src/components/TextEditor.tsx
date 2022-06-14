import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

const TextEditor: React.FC = () => {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState("# Header");
	const editorRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				editorRef.current &&
				event.target &&
				editorRef.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};
		document.addEventListener("click", listener, { capture: true });

		return () => {
			document.removeEventListener("click", listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={editorRef} className="text-editor">
				<MDEditor value={text} onChange={(v) => setText(v || "")}></MDEditor>
			</div>
		);
	}
	return (
		<div
			className="text-editor card"
			onClick={() => {
				setEditing(true);
			}}
		>
			<div className="card-content">
				<MDEditor.Markdown source={text}></MDEditor.Markdown>
			</div>
		</div>
	);
};

export default TextEditor;
