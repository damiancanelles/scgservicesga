'use client'

export default function NavBar() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center md:justify-between sm:justify-center mx-auto p-1">
                <a href="https://scgservicesga.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/logo.svg" className="h-28 sm:h-12 md:h-28" alt="SCG Services Logo" />
                    <span className="self-center text-2xl sm:text-md font-semibold whitespace-nowrap dark:text-white">SCG Services LLC</span>
                </a>
                <div className="flex">
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Call Now 470 - 609 - 7162</button>
                </div>
            </div>
        </nav>
    )
}