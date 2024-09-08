'use client'

import { CardS } from "./card"

export default function Services () {
    return (
        <div className="grid sm:grid-cols-3 justify-center px-auto mx-auto my-4 w-full">
            <CardS image="/1.png" title="Commercial Services" content="We specialize in providing fast, reliable, and efficient junk removal solutions for businesses across the Atlanta Metropolitan Area. Whether you're relocating, renovating, or just clearing out the clutter, we’ve got the expertise to handle all your commercial junk removal needs."></CardS>
            <CardS image="/2.png" title="Hauling" content="We offer reliable and efficient hauling services for all your heavy lifting and transportation needs. Whether you’re clearing out a property, handling construction debris, or relocating bulky items, our team is here to make the process quick and hassle-free."></CardS>
            <CardS image="/5.png" title="Residential Services" content="We make it easy for homeowners to declutter their spaces quickly and affordably. Our residential junk removal services are designed to help you clear out unwanted items from your home, garage, attic, yard, or basement – with no hassle and complete peace of mind."></CardS>
        </div>
    )
}