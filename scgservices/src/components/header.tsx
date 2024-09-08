'use client'

import Image from "next/image"

export default function Header () {
    return (
            <section className="flex items-center bg-red-900 bg-cover bg-center py-6 mt-24">
                <div className="box py-8 px-4 mx-auto w-full text-center lg:py-16">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">
                        Say Goodbye to Junk, Hello to Clean
                    </h1>
                    <h3 className="mb-8 text-lg font-normal text-white lg:text-xl dark:text-gray-400">
                        At our small business, we handle all types of garbage with precision, ensuring every job is done perfectly.
                    </h3>
                </div>
                <div className="box h-auto bg-red-900 py-1 px-4 mx-auto max-w-screen-xl text-center">
                    <div className="relative w-80 h-80 my-4">
                        <Image
                            src="/truck_image.jpg"
                            alt="truck image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full shadow-lg"
                        />
                    </div>
                    <h1 className="py-auto text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-3xl dark:text-white">
                        Call Now
                    </h1>
                    <h1 className="py-auto text-xl font-extrabold tracking-tight leading-none text-white md:text-2xl lg:text-2xl dark:text-white">
                        470 - 609 - 7162
                    </h1>
                </div>
            </section>
    )
}