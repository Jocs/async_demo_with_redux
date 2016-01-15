import { combineReducers } from 'redux'

function selectedCategory(state = 'computer', action) {
	switch (action.type) {
		case 'SELECT_CATEGORY':
			return action.category
		default:
			return state
	}
}

function setData(state = {
	isFetching: false,
	items: []
}, action) {
	switch (action.type) {
		case 'REQUEST_DATA':
			return Object.assign({}, state, {
				isFetching: true
			})
		case 'RECEIVE_DATA':
			return Object.assign({}, state, {
				isFetching: false,
				items: action.data,
				updateAt: action.updateAt
			})
		default:
			return state
	}
}

function dataByCategory(state = {}, action) {
	switch (action.type) {
		case 'REQUEST_DATA':
		case 'RECEIVE_DATA':
			return Object.assign({}, state, {
				[action.category]: setData(state[action.category], action)
			})
		default:
			return state
	}
}

const rootReducer = combineReducers({
	dataByCategory,
	selectedCategory
})

export default rootReducer
