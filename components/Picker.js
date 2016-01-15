/* eslint no-unused-vars: 0 */

import React, { Component, PropTypes } from 'react'

export default class Picker extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { options, onChange, value } = this.props

		return (
			<div>
				<h3>{value}</h3>
				<select onChange={e => onChange(e.target.value)}>
					{options.map(option => <option value={option} key={option}>{option}</option>)}
				</select>
			</div>
		)
	}
}

Picker.propTypes = {
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
}
