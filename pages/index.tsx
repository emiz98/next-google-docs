import Head from 'next/head'
import Header from '../components/Header'
import Documents from '../components/Documents'
import WelcomeScreen from '../components/WelcomeScreen'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {db} from "../firebase"
import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore'
import { Folder, FormatListBulleted, MoreVertOutlined, SortByAlpha } from '@mui/icons-material'

export default function Home() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")

  const createDocument=async () =>{
    if(!input) return;

    const docRef = await addDoc(collection(db, 'userDocs'), {
      email: session?.user?.email,
      fileName: input,
      timestamp: serverTimestamp(),
    })
    setInput('')
    setIsOpen(false)   
  }  

  return (
    <div className="">
      <Head>
        <title>Google Docs 1.0</title>
        <link rel="icon" href="/docs.png" />
      </Head>

      <Header/>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm"
            onClose={()=>setIsOpen(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
    
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Enter Document Title
                  </Dialog.Title>
                  <div className="mt-2">
                <input
                  className="w-full mt-5 py-2 border-none text-center focus:outline-none"
                  type="text"
                  placeholder="Please enter a title ..."
                  value={input}
                  onChange={(e)=>setInput(e.target.value)}
                  onKeyDown={(e)=>e.key==="Enter" && createDocument()}
                />
              </div>
    
                  <div className="mt-8 flex">
                    <button
                      type="button"
                      className="w-full mr-5 inline-flex justify-center px-4 
                      py-2 text-sm font-medium text-blue-600
                       border border-transparent 
                       rounded-md hover:bg-gray-200 focus:outline-none 
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={()=>setIsOpen(false)}
                    >
                      CANCEL
                    </button>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center px-4 
                      py-2 text-sm font-medium text-white
                       bg-blue-600 border border-transparent 
                       rounded-md hover:bg-blue-500 focus:outline-none 
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={createDocument}
                    >
                      CREATE
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}

      {session?(
      <>
        <section className='bg-[#F8F9FA] pb-10 px-10'>
          <div className='max-w-3xl mx-auto'>
            <div className='py-6 flex items-center justify-between'>
              <h2 className='text-gray-700 text-lg'>Start a new document</h2>
              <MoreVertOutlined className='h-6 w-6 cursor-pointer text-gray-500'/>
            </div>
            <div>
              <img onClick={()=>setIsOpen(true)} className='h-52 w-40 border-2 cursor-pointer
              transition-all ease-in-out hover:border-blue-400' 
              src="/docs-blank.png"/>
              <p className='ml-2 mt-2 font-semibold text-sm
              text-gray-700'>Blank</p>
            </div>
          </div>
        </section>
        <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between'>
            <h2 className='font-medium flex-grow'>My Documents</h2>
            <p className='mr-20 hidden md:inline-flex'>Date Created</p>
            <FormatListBulleted className='h-10 object-contain mr-4 text-gray-400'/>
            <SortByAlpha className='h-10 object-contain mr-4 text-gray-400'/>
            <Folder className='h-10 object-contain text-gray-400'/>
          </div>
        </div>
        <Documents/>
        </section>
      </>
      ):(
        <WelcomeScreen/>
      )}
      

      
      
      

     
    </div>
  )
}

//Priority Delete
export async function getServerSideProps(context: GetSessionParams | undefined) {
  const session = await getSession(context)

  return {
    props: {
      session
    },
  };
}