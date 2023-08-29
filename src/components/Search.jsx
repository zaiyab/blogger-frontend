import React from 'react'
import { useState } from 'react'
import { FiSearch } from "react-icons/fi";

const Search = ({ search }) => {
    const [value, setValue] = useState('*')
    const [clicled, setClicked] = useState(null)

    console.log(value, clicled)

    return (
        <section className="container justify-center mx-auto flex flex-col px-5 py-5 lg:flex-row">
            <div className="mt-10 lg:w-1/2 ">

                <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative ">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                        <input
                            className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
                            type="text"
                            onClick={() => { setClicked(null); setValue(value); }}
                            value={value === '*' ? '' : value}
                            onChange={(e) => { setValue(e.target.value) }}
                            placeholder="Search article"
                        />
                    </div>
                    <button
                        onClick={() => { if (value && !clicled) { search(value); setClicked(1); } else { search(''); setValue('*'); setClicked(null); } }}
                        className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
                        {value && !clicled ? "Search" : "Clear"}
                    </button>



                </div>
            </div>
        </section>

    )
}

export default Search
