export const UPDATE_UI = "UPDATE_UI";

export const updateUi = ({ key, value }) => ({
    type: UPDATE_UI,
    payload: { key, value }
});