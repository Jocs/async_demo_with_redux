import express from 'express'
import * as bodyParser from 'body-parser'
import fs from 'fs'

const app = express()
const port = 3000
app.use(express.static(__dirname + '/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/books/:category', (req, res) => {
	console.log(`some request`)
	const category = req.params.category
	fs.readFile('./data.json', 'utf-8', (err, data) => {
		if (err) console.log(err)
		setTimeout(() => {
			res.send(JSON.parse(data)[category])
		}, 1000)
	})
})

app.listen(port, () => console.log(`app listen at ${port}`))
