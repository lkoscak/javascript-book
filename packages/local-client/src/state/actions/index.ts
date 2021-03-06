import { CellTypes, Direction, ICell } from "./../cell";
import { ActionType } from "../action-types";

export interface IMoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	};
}
export interface IDeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: string;
}
export interface IUpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}
export interface IInsertCellAfterAction {
	type: ActionType.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		type: CellTypes;
	};
}

export interface IBundleStartAction {
	type: ActionType.BUNDLE_START;
	payload: {
		cellId: string;
	};
}
export interface IBundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE;
	payload: {
		cellId: string;
		bundle: {
			code: string;
			error: string;
		};
	};
}

export interface IFetchCellsAction {
	type: ActionType.FETCH_CELLS;
}
export interface IFetchCellsCompleteAction {
	type: ActionType.FETCH_CELLS_COMPLETE;
	payload: ICell[];
}
export interface IFetchCellsErrorAction {
	type: ActionType.FETCH_CELLS_ERROR;
	payload: string;
}

export interface ISaveCellsErrorAction {
	type: ActionType.SAVE_CELLS_ERROR;
	payload: string;
}

export type Action =
	| IMoveCellAction
	| IDeleteCellAction
	| IUpdateCellAction
	| IInsertCellAfterAction
	| IBundleStartAction
	| IBundleCompleteAction
	| IFetchCellsAction
	| IFetchCellsCompleteAction
	| IFetchCellsErrorAction
	| ISaveCellsErrorAction;
