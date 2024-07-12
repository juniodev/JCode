import {
	type Request,
	type Response
} from 'express'
import {
	Get
} from '../../Routes'

import { ignores } from './ignores'

import path from 'node:path'
import fs, {
	constants,
	promises as fsPromise
} from 'fs'

import util from 'util'

import os from 'os'
import {
	spawn
} from 'node-pty'

import {
	loadDirectory
} from '../../Core/Utils/LoadDirectory'

class FolderController {

	@Get('/conmand')
	conmand (req: Request, res: Response) {
		return res.send('okk')
	}

	@Get('/list/folders')
	async load(req: Request, res: Response) {
		try {

			const directory = path.resolve('/root/jcode/code')

			const files = await fsPromise.readdir(directory)

			const filesFolders: {
				path: string
				full_path: string
				directories?: {
					path: string
					type: 'directory' | 'file'
				}[]
				protected: boolean
				type: 'directory' | 'file'
			}[] = []

			for (const file of files) {

				const fullDirectory = path.join(directory, file)
				const stats = await fsPromise.stat(fullDirectory)
				
				if (ignores.includes(file)) {
					filesFolders.push({
						path: file,
						full_path: fullDirectory,
						protected: false,
						type: stats.isDirectory() ? 'directory': 'file'
					}); continue
				}

				try {

					const others = await loadDirectory(fullDirectory, ignores)

					filesFolders.push({
						path: file,
						full_path: fullDirectory,
						protected: false,
						type: stats.isDirectory() ? 'directory': 'file',
						directories: others
					})

				} catch (err) {
					filesFolders.push({
						path: file,
						full_path: fullDirectory,
						protected: err ? err.code === 'EACCES': false,
						type: stats.isDirectory() ? 'directory': 'file'
					})
				}

			}

			return res.status(200).json(
				filesFolders.sort((a, b) => {
					if (a.type === 'directory' && b.type === 'file') {
						return -1
					}
					if (a.type === 'file' && b.type === 'directory') {
						return 1
					}
					return 0
				})
			)

		} catch (error) {
			if (process.env.DEBUG) console.log(error)
			return res.status(500).json({
				code: 'UNREAD_FILES'
			})
		}
	}

	@Get('/open/directory')
	async open(req: Request, res, Response) {
		try {

			const {
				folder
			} = req.query

			const directory = path.resolve('/', folder)

			const files = await fs.readdir(directory)

			const filesFolders: {
				value: string
				directories?: {
					value: string
					type: 'directory' | 'file'
				}[]
				type: 'directory' | 'file'
			}[] = []

			for (const file of files) {

				const fullDirectory = path.join(directory, file)

				const stats = await fs.stat(fullDirectory)

				if (stats.isDirectory()) {

					const others = await loadDirectory(`${folder}/${file}`)

					filesFolders.push({
						value: file,
						type: stats.isDirectory() ? 'directory': 'file',
						directories: others
					}); continue
				}

				filesFolders.push({
					value: file,
					type: stats.isDirectory() ? 'directory': 'file'
				})

			}

			return res.status(200).json(filesFolders)

		} catch (error) {
			if (process.env.DEBUG) console.log(error)
			return res.status(500).json({
				code: 'UNREAD_FILES'
			})
		}
	}
}

export default FolderController