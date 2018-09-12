export const UPDATE_UI = "UPDATE_UI";

export interface IUiPayloadType {
	[key: string]: boolean|{}
}

export const updateUi = ({ key, value }: IUiPayloadType) => ({
	payload: { key, value },
	type: UPDATE_UI
});