'use client'

export default function NavBar() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 sm:fixed sm:top-0 sm:left-0 sm:right-0 sm:z-50">
            <div className="max-w-screen-xl grid sm:grid-cols-2 items-center justify-center sm:justify-between p-1">
                <a href="https://scgservicesga.com/" className="grid sm:grid-cols-12 sm:items-center">
                    <img src="/logo.svg" className="sm:col-span-4 h-44 sm:h-28 mx-auto" alt="SCG Services Logo" />
                    <span className="sm:col-span-6 self-center text-4xl sm:text-2xl font-semibold whitespace-nowrap dark:text-white">SCG Services LLC</span>
                </a>
                <div className="grid my-10 sm:my-0 justify-center sm:justify-end w-full">
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg sm:text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Call Now 470 - 609 - 7162</button>
                </div>
            </div>
        </nav>
    )
}