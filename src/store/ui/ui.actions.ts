export const UPDATE_UI = "UPDATE_UI";

export interface IUiPlayloadType {
	[key: string]: boolean|{}
}

export const updateUi = ({ key, value }: IUiPlayloadType) => ({
	payload: { key, value },
	type: UPDATE_UI
});