import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	// createLogger一定要调用
	createLogger()
)(createStore)

export default function configStore(initialStore) {
	const store = createStoreWithMiddleware(rootReducer, initialStore)
	return store
}
