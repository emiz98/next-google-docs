import { Menu, PeopleAlt } from '@mui/icons-material'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import TextEditor from '../../components/TextEditor'

function Doc() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const terminalPayload = router.query

  if (status == 'unauthenticated') {
    signIn()
  }

  return (
    <div>
      <Head>
        <title>Google Docs 1.0</title>
        <link rel="icon" href="/docs.png" />
      </Head>
      {session && (
        <>
          <header
            className="sticky top-0 z-50 flex items-center justify-between 
    bg-white px-4 shadow-md"
          >
            <div className="flex items-center">
              <Menu
                className="h-8 w-8 cursor-pointer
        transition-all ease-in-out hover:text-gray-500"
              />
              <span
                onClick={() => router.push('/')}
                className="cursor-pointer rounded-full p-2 transition-all
            ease-in-out hover:bg-gray-200 hover:shadow"
              >
                <img className="w-14 object-contain" src="/docs.png" alt="" />
              </span>
            </div>
            <div className="flex-grow px-2">
              <h2 className="font-medium text-gray-700">
                {terminalPayload.docTitle}
              </h2>
              <div
                className="-ml-1 flex h-8 items-center space-x-1 text-sm
          text-gray-600"
              >
                <p className="option">File</p>
                <p className="option">Edit</p>
                <p className="option">View</p>
                <p className="option">Insert</p>
                <p className="option">Format</p>
                <p className="option">Tools</p>
              </div>
            </div>
            <button
              className="hidden h-10 items-center 
        rounded-[5px] bg-blue-500 p-3 font-medium 
        text-white md:inline-flex"
            >
              <PeopleAlt className="mr-2" />
              <span>SHARE</span>
            </button>
            <img
              onClick={signOut}
              loading="lazy"
              className="ml-2 h-10 w-10 cursor-pointer rounded-full"
              src={session?.user?.image}
              alt=""
            />
          </header>

          <TextEditor />
        </>
      )}
    </div>
  )
}

export default Doc

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
