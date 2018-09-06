import { ThunkAction } from "redux-thunk";
import { IRootState } from "./rootReducer";
import { IAction } from "./state.interfaces";

export type ThunkResult<R> = ThunkAction<R, IRootState, undefined, IAction>;