import {
	spawn,
	UnixTerminal
} from 'node-pty';
import os from 'os';

class Terminal {
	
	constructor(){
		
	}

	#terminals = new Map<string, UnixTerminal>();

	private #addTerminal(id: string) {
		if (this.#terminals.has(id)) return;
		const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
		const pty = spawn(shell, [], {
			name: 'xterm-256color',
			cols: 50,
			rows: 22,
			cwd: process.env.HOME,
			env: process.env
		});
		this.#terminals.set(id, pty);
	}
	
	getTerminal(id: string): UnixTerminal | undefined {
		if (this.#terminals.has(id)) {
			return this.#terminals.get(id);
		}
		this.#addTerminal(id);
		return this.#terminals.get(id);
	}
	
	disposeTerminal(id: string) {
		this.#terminals.delete(id)
	}
	
	size(): number {
		return this.#terminals.size;
	}

}

export default Terminal;
