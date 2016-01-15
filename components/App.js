/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectCategory, fetchDataIfNeeded } from '../actions'

import Picker from './Picker'
import Posts from './Posts.js'

console.log(Posts)

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const {dispatch, selectedCategory} = this.props
		dispatch(fetchDataIfNeeded(selectedCategory))
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedCategory !== this.props.selectedCategory) {
			const {dispatch, selectedCategory} = nextProps
			dispatch(fetchDataIfNeeded(selectedCategory))
		}
	}

	handleChange(nextCategory) {
		this.props.dispatch(selectCategory(nextCategory))
	}

	render() {
		const {selectedCategory, isFetching, updateAt, items} = this.props
		return (
			<div>
				<Picker
					options={['computer', 'bioScience']}
					onChange={this.handleChange.bind(this)}
					value={selectedCategory}
				/>
				<span>{new Date(updateAt).toLocaleTimeString()}</span>
				{
					isFetching && items.length === 0 && <h2>Loading</h2>
				}
				{
					!isFetching && items.length === 0 && <h2>Empty</h2>
				}
				{
					items.length > 0 &&
					<div style={{color: isFetching ? 'red' : 'blue'}}>
						<Posts books={items}/>
					</div>
				}
			</div>
		)
	}

}

App.propTypes = {
	selectedCategory: PropTypes.string.isRequired,
	isFetching: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	updateAt: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const {selectedCategory, dataByCategory} = state
	const {
		isFetching,
		items,
		updateAt
	} = dataByCategory[selectedCategory] || {
		isFetching: true,
		items: []
	}

	return {
		selectedCategory,
		isFetching,
		items,
		updateAt
	}
}

export default connect(mapStateToProps)(App)
