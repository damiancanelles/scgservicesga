/* eslint-disable react/no-unescaped-entities */
'use client'

import { Carousel } from "flowbite-react";
import { Blockquote } from "flowbite-react";

export default function About() {
    return (
        <div className="h-[800px] sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <div className="h-full p-12">
                    <span className="text-5xl font-extrabold tracking-tight">Where we work ?</span>
                    <Blockquote className="my-10">
                        "At SCG Services, we proudly offer our top-tier junk removal services throughout the Atlanta Metropolitan Area. Whether you're in the heart of the city or in the surrounding areas, we've got you covered. No matter where you are, we’re ready to help you say goodbye to junk and hello to clean! Call us today for fast, reliable, and professional junk removal services in your area!"
                    </Blockquote>
                </div>
                <div className="h-full p-12">
                    <span className="text-5xl font-extrabold tracking-tight">What we get ?</span>
                    <Blockquote className="my-10">
                        "We take just about everything! Whether it’s a single item or an entire property cleanup, we’ve got you covered. Whatever you need gone, our team will handle it with care and professionalism. Say Goodbye to Junk, Hello to Clean – contact us today for a free estimate!"
                    </Blockquote>
                </div>
            </Carousel>
        </div>
    )
}