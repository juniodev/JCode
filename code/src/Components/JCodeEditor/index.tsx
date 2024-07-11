import styles from './editor.module.css'

import {
	VFC,
	useRef,
	useState,
	useEffect
} from 'react'

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import './EditorWork'

const JCodeEditor: VFC = () => {

	const [editor,
		setEditor] = useState < monaco.editor.IStandaloneCodeEditor | null > (null)

	const editorEl = useRef < HTMLDivElement | null > (null)

	useEffect(() => {
		if (editorEl) {
			setEditor((editor) => {
				if (editor) return editor;

				return monaco.editor.create(editorEl.current!, {
					value: 'console.log("JCode")',
					language: 'typescript',
					minimap: {
						enabled: false
					},
					scrollbar: {
						horizontal: 'hidden',
						vertical: 'hidden'
					},
					guides: {
						indentation: false
					},
					glyphMargin: false,
					folding: false,
					lineDecorationsWidth: 0,
					lineNumbersMinChars: 0,
					renderLineHighlight: 'none',
					lineNumbers: 'on',
					renderLineHighlightOnlyWhenFocus: false,
					cursorBlinking: 'solid',
					quickSuggestions: true,
				})
			})

			return () => editor?.dispose()
		}
	}, [editorEl.current])

	return <div ref={editorEl} className={styles.editor} />
}

export default JCodeEditor