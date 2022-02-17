import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Article, Delete, MoreVertOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

function Documents() {
  const { data: session } = useSession()
  const [userDocs, setUserDocs] = useState([])
  const router = useRouter()

  if (session) {
    useEffect(
      () =>
        onSnapshot(
          query(
            collection(db, 'userDocs'),
            orderBy('timestamp', 'desc'),
            where('email', '==', session?.user?.email)
          ),
          (snapshot) => {
            //   setUserDocs(snapshot.docs.map((doc) => doc.data()))
            setUserDocs(snapshot.docs)
          }
        ),
      [db]
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      {userDocs.map((userDoc) => (
        <div className="flex items-center justify-between">
          <div
            key={userDoc.id}
            onClick={() =>
              router.push({
                pathname: `/doc/${userDoc.id}`,
                query: { docTitle: userDoc.data().fileName },
              })
            }
            className="relative mb-2 flex flex-grow cursor-pointer items-center
        rounded-lg p-4 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Article className="text-3xl text-blue-500" />
            <p className="flex w-10 flex-grow truncate pl-5 pr-10">
              {userDoc.data().fileName}
            </p>
            <p className="mr-32 hidden pr-5 md:inline-flex">
              {userDoc?.data()?.timestamp?.toDate().toLocaleDateString()}
            </p>
            <MoreVertOutlined className="mr-3 cursor-pointer hover:text-gray-500" />
          </div>
          {/* <MoreVertOutlined className="mr-3 cursor-pointer hover:text-gray-500" /> */}
          {/* <Delete className="h-10 cursor-pointer object-contain text-red-500 text-gray-400 hover:text-red-300" /> */}
        </div>
      ))}
    </div>
  )
}

export default Documents
