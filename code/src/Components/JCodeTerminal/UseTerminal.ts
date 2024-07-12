import {
	useEffect,
	useRef
} from 'react'

import { v4 as uuid } from 'uuid'

import {
	Terminal
} from "@xterm/xterm"
import '@xterm/xterm/css/xterm.css'

import {
	FitAddon
} from '@xterm/addon-fit'
import {
	CanvasAddon
} from '@xterm/addon-canvas'
import {
	WebglAddon
} from '@xterm/addon-webgl'

import {
	io
} from 'socket.io-client'

export const useTerminal = () => {

	const refTerm = useRef(null)

	useEffect(() => {

		if (!refTerm.current) return

		const container = refTerm.current

		const fontSize = 14 // Defina o tamanho da fonte que você está usando no terminal
		const containerWidth = container.clientWidth
		const containerHeight = container.clientHeight

		const cols = Math.floor(containerWidth / (fontSize * 0.6))
		const rows = Math.floor(containerHeight / (fontSize * 1.2))

		const term = new Terminal( {
			scrollOnWrite: true,
			cols: cols,
			rows: rows,
		})

		term.options = {
			cursorBlink: true,
			convertEol: true,
			disableStdin: false
		}

		term.options.theme = {
			background: '#232533',
			foreground: '#fff',
		}
		term.options.fontSize = 14

		const socket = io(
			`http://10.0.0.102:3001/terminal-${uuid()}`,
			{
				transports: ["websocket"],
			}
		)

		term.loadAddon(new CanvasAddon())

		const addon = new WebglAddon();
		addon.onContextLoss(e => {
			addon.dispose();
		});
		term.loadAddon(addon);

		const fitAddon = new FitAddon()
		term.loadAddon(fitAddon)

		term.open(refTerm.current)
		
		socket.on('terminal.received', (data) => {
			term.write(data)
		})

		term.onData((data) => {
			socket.emit('terminal.send', data)
		})

		window.addEventListener('resize', () => {
			socket.emit('terminal.resize', {
				rows,
				cols
			})
			fitAddon.fit()
			term.scrollToBottom()
		})
		
		return () => {
			socket.disconnect(),
			term.dispose()
		}
	},
		[])

	return {
		refTerm
	}
}