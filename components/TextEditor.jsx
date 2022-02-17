import dynamic from 'next/dynamic'
import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'
import { db } from '../firebase'
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
  setDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { useEffect } from 'react'
import { async } from '@firebase/util'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  }
)

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { data: session } = useSession()
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    const getDocs = async () => {
      const docSnap = await getDoc(doc(db, 'userDocs', id))
      if (docSnap?.data()?.editorState) {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(docSnap?.data()?.editorState)
          )
        )
      }
    }
    getDocs()
  }, [])

  const onEditorStateChange = async (editorState) => {
    setEditorState(editorState)

    await setDoc(
      doc(db, 'userDocs', id),
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
      { merge: true }
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        className="rdw-editor-toolbar"
        editorClassName="mt-6 bg-white shadow-lg max-w-6xl mx-auto
        mb-12 border p-10"
      />
    </div>
  )
}

export default TextEditor
