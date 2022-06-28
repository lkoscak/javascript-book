import { RootState } from "./../reducers/index";
import { Action } from "./../actions/index";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
export const persistMiddleware = ({
	dispatch,
	getState,
}: {
	dispatch: Dispatch<Action>;
	getState: () => RootState;
}) => {
	let timer: any = null;
	return (next: (action: Action) => void) => {
		return (action: Action) => {
			next(action);
			if (
				[
					ActionType.MOVE_CELL,
					ActionType.UPDATE_CELL,
					ActionType.INSERT_CELL_AFTER,
					ActionType.DELETE_CELL,
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer);
					timer = null;
				}
				timer = setTimeout(() => {
					saveCells()(dispatch, getState);
				}, 250);
			}
		};
	};
};
