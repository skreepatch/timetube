export const arrayFromObject = (map: any, iteratorFnKey: string) => {
	if (!map || !iteratorFnKey || !Object.hasOwnProperty(iteratorFnKey)) {
		return [];
	}
	return Object[iteratorFnKey](map);
};