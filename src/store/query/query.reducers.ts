import { IAction } from "../state.interfaces";
import {UPDATE_QUERY} from "./query.actions";

export interface IQueryState {
	hashtags: string[];
	searchTerm: string;
}

const initialState: IQueryState = {
	hashtags: [],
	searchTerm: ""
};

export const query = (state = initialState, action: IAction): IQueryState => {
    switch (action.type) {
        case UPDATE_QUERY:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};