import React from 'react';
import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'

const Home = () => {
    return ( 
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey overflow-scroll"'>
            <Header />
            <div className='flex flex-col items-center w-full'>
                <div className='relative flex text-gray-400 w-full'>
                    <AiOutlineSearch className='absolute left-12 bottom-4 text-xl text-gray-400'/>
                    <input type='text' placeholder='Search for a country...' className='pr-3 pl-20 py-2 ml-4 font-normal text-xs rounded mt-6 shadow-md h-12 w-11/12'></input>
                </div>
                <section className='flex w-full ml-4 mt-10'>
                    <select className='h-12 w-6/12 pl-6 rounded shadow-md font-normal text-xs'>
                        <option value="" disabled selected hidden>Filter by Region</option>
                        <option value="fake">Fake</option>
                    </select>
                </section>
            </div>




        </main>
    );
}

export default Home;