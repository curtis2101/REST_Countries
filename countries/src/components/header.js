import React, {useState} from 'react';
import {HiOutlineMoon} from 'react-icons/hi'
import {BsSun} from 'react-icons/bs'

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
        <div className="border-b-2 shadow-sm flex justify-between items-center w-full h-20 bg-white">
            <h1 className="ml-4 text-sm font-extrabold">Where in the world?</h1>
            {mode ? <h2 onClick={toggleDarkMode} className="inline-flex w-24 items-end mb-1 justify-between mr-4 font-semibold text-xs"><HiOutlineMoon size={20}/> Dark Mode</h2>:
            <h2 onClick={toggleDarkMode} className="inline-flex w-24 items-end mb-1 justify-between mr-4 font-semibold text-xs"><BsSun size={20}/> Light Mode</h2>}
        </div>
    );
}

export default Header;