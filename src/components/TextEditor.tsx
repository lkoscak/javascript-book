import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { useActions } from "../hooks/useActions";
import { ICell } from "../state";
interface ITextEditorProps {
	cell: ICell;
}
const TextEditor: React.FC<ITextEditorProps> = ({ cell }) => {
	const [editing, setEditing] = useState(false);
	const { updateCell } = useActions();
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
				<MDEditor
					value={cell.content}
					onChange={(v) => updateCell(cell.id, v || "")}
				></MDEditor>
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
				<MDEditor.Markdown
					source={cell.content || "Click to edit"}
				></MDEditor.Markdown>
			</div>
		</div>
	);
};

export default TextEditor;
