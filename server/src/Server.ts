import express from 'express';
import os from 'os'
import path from 'path'

import {
	createServer
} from 'http'
import {
	Server
} from 'socket.io'
import {
	spawn
} from 'node-pty'

import {
	routes
} from './Routes'
import cors from 'cors'

import Terminal from './Core/Terminal/Terminal'

const term = new Terminal()

import Utils from './Core/Utils/Utils'

const app = express();
const server = createServer(app);

const origins = [
	'http://localhost:8159',
	'http://localhost:3000',
	'http://127.0.0.1:3000',
	"http://10.0.0.102:4173",
	"http://10.0.0.102:3000"
]

const io = new Server(server, {
	cors: {
		origin: origins,
		methods: ["GET", "POST"]
	}
})

app.use(cors( {
	origin: origins
}))

const space = io.of(/\/terminal-\w+/)

space.on('connection', (socket) => {
	try {

		const id = socket.nsp.name.replace('/', '')

		console.log('Terminal ID: ', id)

		const currentTerm = term.getTerminal(id)

		currentTerm.on('data', data => {
			socket.emit('terminal.received', data)
		})

		socket.on('terminal.send', (data) => {
			currentTerm.write(data)
		});

		socket.on('terminal.resize', (data) => {
			currentTerm.resize(data.cols, data.rows)
		})

		socket.on('disconnect', () => {
			term.disposeTerminal(id)
		})
	} catch (error) {
		console.log(error)
	}
});

app.use(routes)

const iconsPath = path.join('/root/jcode/plugins/themes/default/icons')

app.use('/icons', express.static(iconsPath))


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});