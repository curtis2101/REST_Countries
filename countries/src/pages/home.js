import React from 'react';
import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'
import useFetch from '../useFetch.js'

const Home = () => {
    const {data,isPending, error} = useFetch('https://restcountries.com/v2/all');

    return ( 
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey overflow-scroll"'>
            
            <div className='flex flex-col items-center w-full'>
            <Header />
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
                <div className="flex flex-col h-full w-full">
                {error &&<div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {data && data.map(data => (
                    <section className='mt-10 flex flex-col items-center'>
                        <div className='rounded-lg bg-white w-9/12 h-80 shadow-md'>
                            <img className="rounded-t-lg w-full h-36"src={data.flags.png} alt="flag"/>
                            <h1 className="mt-4 ml-4 font-extrabold text-lg">{data.name}</h1>
                            <h2 className="mt-4 ml-4 font-semibold text-sm">Population: <span className="text-sm font-light">{data.population}</span></h2>
                            <h2 className="mt-4 ml-4 font-semibold text-sm">Region: <span className='text-sm font-light'>{data.region}</span></h2>
                            <h2 className="mt-4 ml-4 font-semibold text-sm">Capital: <span className='text-sm font-light'>{data.capital}</span></h2>
                        </div>
                    </section>
                ))}


                </div>
            </div>




        </main>
    );
}

export default Home;