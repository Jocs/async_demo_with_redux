/* eslint no-unused-vars: 0 */
import React, { Component, PropTypes } from 'react'

export default class Posts extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { books } = this.props
		console.log(books)
		return (
			<ul>
			{books.map(book => <li key={book.name}><a href='#'>{book.name}</a>{book.year}</li>)}
			</ul>
		)
	}
}

Posts.propTypes = {
	books: PropTypes.array.isRequired
}
