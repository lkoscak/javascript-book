import { useEffect } from "react";
import { ICell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";

interface ICodeCellProps {
	cell: ICell;
}

const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);
	useEffect(() => {
		const timer: any = setTimeout(async () => {
			createBundle(cell.id, cell.content);
		}, 750);

		return () => {
			clearTimeout(timer);
		};
	}, [cell.content, cell.id]);

	return (
		<Resizable direction="vertical">
			<div
				style={{
					height: "calc(100% - 10px)",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => {
							updateCell(cell.id, value);
						}}
					></CodeEditor>
				</Resizable>
				{bundle && <Preview code={bundle.code} error={bundle.error}></Preview>}
			</div>
		</Resizable>
	);
};

export default CodeCell;
