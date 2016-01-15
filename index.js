/* eslint no-unused-vars: 0 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import configStore from './store/configStore'

const store = configStore()
const rootElement = document.querySelector('#root')

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	rootElement
)
