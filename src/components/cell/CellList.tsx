import React, { Fragment } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import CellListItem from "./CellListItem";
import AddCell from "../AddCell";

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((cellId) => data[cellId])
	);
	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell}></CellListItem>
			<AddCell previousCellId={cell.id}></AddCell>
		</Fragment>
	));
	return (
		<>
			<AddCell
				forceVisible={cells.length === 0}
				previousCellId={null}
			></AddCell>
			{renderedCells}
		</>
	);
};

export default CellList;
