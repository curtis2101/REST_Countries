import React, {useState} from 'react';
import {HiOutlineMoon} from 'react-icons/hi'
import {BsSun} from 'react-icons/bs'
import { IconContext } from "react-icons";

const Header = () => {
    const [mode, setMode] = useState(true)

    const toggleDarkMode = () => {
        if(mode){
            document.documentElement.classList.add('dark')
            setMode(mode => mode = !mode)
        }
        if(!mode) {
            document.documentElement.classList.remove('dark')
            setMode(mode => mode = !mode)
        }
    }

    return ( 
        <div className="border-b-2 shadow-sm flex justify-between items-center w-full h-20 bg-white dark:bg-darkblue">
            <h1 className="ml-4 text-sm font-extrabold md:text-2xl md:ml-20 dark:text-white">Where in the world?</h1>
            {mode ? <h2 onClick={toggleDarkMode} className="inline-flex w-24 md:w-28 items-end mb-1 justify-between mr-4 font-semibold text-xs md:text-base md:mr-20 cursor-pointer"><IconContext.Provider value={{className:'h-4 w-4 ml-3 md:h-5 md:w-5 md:mb-1 md:ml-1'  }}><HiOutlineMoon/></IconContext.Provider> Dark Mode</h2> :
            <h2 onClick={toggleDarkMode} className="inline-flex w-24 md:w-28 items-end mb-1 justify-between mr-4 font-semibold text-xs md:text-base md:mr-20 dark:text-white cursor-pointer"><IconContext.Provider value={{className:'h-4 w-4 ml-3 md:h-5 md:w-5 md:mb-1 md:ml-1'  }}><BsSun/></IconContext.Provider> Light Mode</h2>}
        </div>
    );
}

export default Header;