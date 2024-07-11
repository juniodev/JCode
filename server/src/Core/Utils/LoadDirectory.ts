import path from 'node:path'
import fs, {
  constants,
  promises as fsPromise
} from 'fs'

export const loadDirectory = async (directory: string, ignores: string[]) => {
  const dirs = await fsPromise.readdir(directory, { withFileTypes: true })

  const filesFolders: {
    path: string
    full_path: string
    protected?: boolean
    type: 'directory' | 'file',
    directories?: {
      path: string
      type: 'directory' | 'file'
    }[]
  }[] = []

  for (const dir of dirs) {
    const fullDirectory = path.join(directory, dir.name)
    const stats = await fsPromise.stat(fullDirectory)

    try {
      await fsPromise.access(fullDirectory, constants.R_OK)

      const entry = {
        path: dir.name,
        full_path: fullDirectory,
        protected: false,
        type: dir.isDirectory() ? 'directory' : 'file'
      }

      if (dir.isDirectory()) {
        entry.directories = await loadDirectory(fullDirectory) // Recursively load subdirectories
      }

      filesFolders.push(entry)

    } catch (err) {
      filesFolders.push({
        path: dir.name,
        full_path: fullDirectory,
        protected: err ? err.code === 'EACCES' : false,
        type: dir.isDirectory() ? 'directory' : 'file'
      })
    }
  }

  return filesFolders
}
