import React from 'react';
import {HiOutlineMoon} from 'react-icons/hi'

const Header = () => {
    return ( 
        <div className="border-b-2 shadow-sm flex justify-between items-center w-full h-20 bg-white">
            <h1 className="ml-4 text-sm font-extrabold">Where in the world?</h1>
            <h2 className="inline-flex w-24 items-end mb-1 justify-between mr-4 font-semibold text-xs"><HiOutlineMoon size={20}/> Dark Mode</h2>
        </div>
    );
}

export default Header;