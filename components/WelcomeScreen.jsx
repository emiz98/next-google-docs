import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

function WelcomeScreen() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <div className="my-10 flex min-h-fit flex-col justify-between !overflow-hidden p-10 md:flex-row md:p-20">
      <div className=" mt-5 flex-col">
        <h1 className="mb-5  !font-sans text-3xl font-normal md:max-w-4xl md:text-6xl">
          Build your best ideas together, in Google Docs Clone
        </h1>
        <p className="mb-5  !font-sans text-xl">
          Create and collaborate on online documents in real-time and from any
          device.
        </p>
        <div className="mt-2 flex">
          <button
            onClick={signIn}
            className="mr-5 rounded-sm bg-blue-500 p-3 text-white transition-all ease-in-out hover:bg-blue-600"
          >
            Try Docs for Free
          </button>
          <button
            onClick={signIn}
            className="rounded-sm border border-gray-200 p-3 text-blue-500 hover:border-blue-600"
          >
            Go to Docs
          </button>
        </div>
        <p className="mt-5 hidden text-gray-500 md:inline-block">
          Don't have an account?
          <button
            onClick={signIn}
            className="ml-5 cursor-pointer p-3 font-medium text-blue-500 hover:bg-gray-100"
          >
            Sign up for free
          </button>
        </p>
      </div>
      <div className="hidden  lg:inline-flex">
        <img className="w-[600px] object-contain" src="/unnamed.png" alt="" />
      </div>
    </div>
  )
}
export default WelcomeScreen
