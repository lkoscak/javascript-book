import React from "react";
import { ICell } from "../../state";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";
import ActionBar from "../ActionBar";
import "./cell-list-item.css";

interface ICellListItemProps {
	cell: ICell;
}

const CellListItem: React.FC<ICellListItemProps> = ({ cell }) => {
	let child: JSX.Element =
		cell.type === "code" ? (
			<>
				<div className="action-bar-wrapper">
					<ActionBar id={cell.id}></ActionBar>
				</div>
				<CodeCell cell={cell}></CodeCell>
			</>
		) : (
			<>
				<TextEditor cell={cell}></TextEditor>
				<ActionBar id={cell.id}></ActionBar>
			</>
		);
	return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
