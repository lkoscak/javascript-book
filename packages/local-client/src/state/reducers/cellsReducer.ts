import produce from "immer";
import { ICell } from "./../cell";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface CellsState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: ICell;
	};
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const reducer = produce(
	(state: CellsState = initialState, action: Action): CellsState => {
		switch (action.type) {
			case ActionType.FETCH_CELLS: {
				state.loading = true;
				state.error = null;
				return state;
			}
			case ActionType.FETCH_CELLS_COMPLETE: {
				state.loading = false;
				state.order = action.payload.map((cell) => cell.id);
				state.data = action.payload.reduce((result, current) => {
					result[current.id] = current;
					return result;
				}, {} as CellsState["data"]);
				return state;
			}
			case ActionType.FETCH_CELLS_ERROR: {
				state.loading = false;
				state.error = action.payload;
				return state;
			}
			case ActionType.MOVE_CELL: {
				const { id, direction } = action.payload;
				const index = state.order.findIndex((cell) => cell === id);
				const newIndex = direction === "up" ? index - 1 : index + 1;
				if (newIndex < 0 || newIndex > state.order.length - 1) return state;
				state.order[index] = state.order[newIndex];
				state.order[newIndex] = id;
				return state;
			}
			case ActionType.DELETE_CELL: {
				delete state.data[action.payload];
				state.order = state.order.filter((cell) => cell !== action.payload);
				return state;
			}
			case ActionType.UPDATE_CELL: {
				const { id, content } = action.payload;
				state.data[id].content = content;
				return state;
			}
			case ActionType.INSERT_CELL_AFTER: {
				const { id, type } = action.payload;
				const cell: ICell = {
					content: "",
					type: type,
					id: generateRandomId(),
				};
				state.data[cell.id] = cell;
				const index = state.order.findIndex((cell) => cell === id);
				if (index < 0) {
					state.order.unshift(cell.id);
				} else {
					state.order.splice(index + 1, 0, cell.id);
				}
				return state;
			}
			default:
				return state;
		}
	},
	initialState
);

const generateRandomId = () => {
	return Math.random().toString(36).substring(2, 5);
};

export default reducer;
