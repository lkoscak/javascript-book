import { RootState } from "./../reducers/index";
import { Dispatch } from "redux";
import axios from "axios";
import { CellTypes, Direction, ICell } from "./../cell";
import { ActionType } from "../action-types";
import {
	Action,
	IUpdateCellAction,
	IMoveCellAction,
	IInsertCellAfterAction,
	IDeleteCellAction,
} from "../actions";
import bundle from "../../bundler";

export const updateCell = (id: string, content: string): IUpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id,
			content,
		},
	};
};
export const deleteCell = (id: string): IDeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id,
	};
};
export const moveCell = (id: string, direction: Direction): IMoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	};
};
export const insertCellAfter = (
	id: string | null,
	cellType: CellTypes
): IInsertCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: {
			id,
			type: cellType,
		},
	};
};

export const createBundle = (cellId: string, input: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellId,
			},
		});
		const result = await bundle(input);
		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellId,
				bundle: result,
			},
		});
	};
};

export const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.FETCH_CELLS });
		try {
			const { data }: { data: ICell[] } = await axios.get("/cells");
			dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
		} catch (error: any) {
			dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: error.message });
		}
	};
};

export const saveCells = () => {
	return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
		try {
			const {
				cells: { order, data },
			} = getState();
			const cells = order.map((id) => data[id]);
			await axios.post("/cells", { cells });
		} catch (error: any) {
			dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: error.message });
		}
	};
};
