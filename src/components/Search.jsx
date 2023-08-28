import React from 'react'
import { useState } from 'react'
import { FiSearch } from "react-icons/fi";

const Search = ({ search }) => {
    const [value, setValue] = useState('*')
    const [clicled, setClicked] = useState(null)
    console.log(value, clicled)

    return (
        <div className="flex md:flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative  w-[400px]">
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                <input
                    className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
                    type="text"
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

    )
}

export default Search
