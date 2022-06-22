import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface IBundlesState {
	[key: string]:
		| {
				loading: boolean;
				code: string;
				error: string;
		  }
		| undefined;
}

const initialState: IBundlesState = {};

const reducer = produce(
	(state: IBundlesState = initialState, action: Action): IBundlesState => {
		switch (action.type) {
			case ActionType.BUNDLE_START: {
				state[action.payload.cellId] = {
					loading: true,
					code: "",
					error: "",
				};
				return state;
			}
			case ActionType.BUNDLE_COMPLETE: {
				const { code, error } = action.payload.bundle;
				state[action.payload.cellId] = {
					loading: false,
					code,
					error,
				};
				return state;
			}
			default:
				return state;
		}
	},
	initialState
);

export default reducer;
