import React from 'react';
import {HiOutlineMoon} from 'react-icons/hi'

const Header = () => {
    return ( 
        <div className="border-b-2 shadow-sm flex justify-between items-center w-full h-20 bg-white">
            <h1 className="ml-4 font-nunitoSans text-sm font-extrabold">Where in the world?</h1>
            <h2 className="inline-flex mr-4 font-medium text-xs font-nuntioSans"><HiOutlineMoon size={20}/> Dark Mode</h2>
        </div>
    );
}

export default Header;