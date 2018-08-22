import { UPDATE_UI } from "../../constants/action-types";

export const updateUi = ({ key, value }) => ({
    type: UPDATE_UI,
    payload: { key, value }
});

export const setError = (error) => ({
    type: UPDATE_UI,
    payload: error
});
