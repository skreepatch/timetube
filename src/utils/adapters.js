import { API_URL, API_KEY } from '../config';

//TODO: Do you use this functions?
export const QueryAdapeter = ( query ) => {
    const params = {...query, apikey: API_KEY};
    
    return Object.keys(params).reduce( (acc, key) => {
        let operator = acc === API_URL ? '?' : '&';

        return params[key] ? `${acc}${operator}${key}=${params[key]}` : acc;
    }, API_URL);
};

export const ReposnseAdapter = (partialState) => {
    return {
        response: partialState.Response === "True" ? true : false, 
        results: partialState.Search, 
        error: partialState.Error || "", 
        totalResults: partialState.totalResults, 
        query: partialState.query
    };
}

export const ByIdUrl = (imdbID) => {
    return `${API_URL}?i=${imdbID}&apikey=${API_KEY}`;
}