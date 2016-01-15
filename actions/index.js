import fetch from 'isomorphic-fetch'

export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA = 'RECEIVE_DATA'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export function selectCategory(category) {
	return {
		type: SELECT_CATEGORY,
		category
	}
}

function requestData(category) {
	return {
		type: REQUEST_DATA,
		category
	}
}

function receiveData(category, data) {
	return {
		type: RECEIVE_DATA,
		category,
		data,
		updateAt: Date.now()
	}
}

function shoudFetchData(state, category) {
	const books = state.dataByCategory[category]
	if (!books) {
		return true
	}
	if (books.isFetching) {
		return false
	}
	return true
}

function fetchData(category) {
	return dispatch => {
		dispatch(requestData(category))
		return fetch(`/books/${category}`)
			.then(response => response.json())
			.then(json => dispatch(receiveData(category, json)))
	}
}

export function fetchDataIfNeeded(category) {
	return (dispatch, getState) => {
		if (shoudFetchData(getState(), category)) {
			return dispatch(fetchData(category))
		}
	}
}
