import React, { Fragment, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "../AddCell";
import "./cell-list.css";
import { useActions } from "../../hooks/useActions";

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((cellId) => data[cellId])
	);
	const { fetchCells } = useActions();
	useEffect(() => {
		fetchCells();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell}></CellListItem>
			<AddCell previousCellId={cell.id}></AddCell>
		</Fragment>
	));
	return (
		<div className="cell-list">
			<AddCell
				forceVisible={cells.length === 0}
				previousCellId={null}
			></AddCell>
			{renderedCells}
		</div>
	);
};

export default CellList;
