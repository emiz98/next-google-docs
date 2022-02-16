import { MenuIcon, ViewGridIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'

function Header() {
  return (
    <div
      className="sticky top-0 z-50 flex items-center justify-between 
    bg-white px-4 py-2 shadow-md"
    >
      {/* Left */}
      <div className="flex items-center">
        <MenuIcon
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
        <SearchIcon className="h-6 text-gray-500" />
        <input
          className="flex-grow bg-transparent px-5 text-base font-medium outline-none"
          type="text"
          placeholder="Search"
        />
      </div>

      {/* Right */}
      <div className="flex">
        <ViewGridIcon className="h-15 w-15" />
        <img
          loading="lazy"
          className="ml-2 h-12 w-12 cursor-pointer rounded-full"
          src="https://avatars.githubusercontent.com/u/64089619?v=4"
          alt=""
        />
      </div>
    </div>
  )
}

export default Header
