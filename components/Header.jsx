import { signIn, signOut, useSession } from 'next-auth/react'
import { Menu, Apps, Search } from '@mui/icons-material'

function Header() {
  const { data: session } = useSession()

  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between 
    bg-white px-4 py-2 shadow-md"
    >
      {/* Left */}
      <div className="flex items-center">
        <Menu
          className="h-8 w-8 cursor-pointer
        transition-all ease-in-out hover:text-gray-500"
        />
        <img className="w-14 object-contain" src="/docs.png" alt="" />
        <h1 className="ml-2 text-2xl text-gray-700">Docs</h1>
      </div>

      {/* Search */}
      <div
        className="mx-5 hidden flex-grow items-center rounded-lg bg-gray-100 px-5 
      py-2 text-gray-600 focus-within:text-gray-600 focus-within:shadow-md md:mx-20 md:inline-flex"
      >
        <Search className="h-6 text-gray-500" />
        <input
          className="flex-grow bg-transparent px-5 text-base font-medium outline-none"
          type="text"
          placeholder="Search"
        />
      </div>

      {/* Right */}
      <div className="flex items-center">
        <Apps
          className="mr-2 h-8 cursor-pointer text-gray-600
        transition-all ease-in-out hover:text-gray-500"
        />
        {session ? (
          <img
            onClick={signOut}
            loading="lazy"
            className="ml-2 h-12 w-12 cursor-pointer rounded-full"
            src={session.user.image}
            alt=""
          />
        ) : (
          <div
            className="w-100 flex h-10 cursor-pointer items-center
           rounded-full bg-blue-500 p-5 transition-all
           ease-in-out hover:bg-blue-400"
            onClick={signIn}
          >
            <h1 className="font-medium text-white">Sign In</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
