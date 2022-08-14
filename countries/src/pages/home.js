import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'
import AllCountries from '../components/allCountries.js'
import Africa from '../components/africa.js'
import America from '../components/america.js'
import Asia from '../components/asia.js'
import Europe from '../components/europe.js'
import Oceania from '../components/oceania.js'
import React, {useState} from 'react'

const Home = () => {
    const [region,setRegion] = useState("");
    

    return ( 
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey overflow-scroll"'>
            <div className='flex flex-col items-center w-full'>
                <Header />
                <div className='relative flex text-gray-400 w-full'>
                    <AiOutlineSearch className='absolute left-12 bottom-4 text-xl text-gray-400'/>
                    <input type='text' placeholder='Search for a country...' className='pr-3 pl-20 py-2 ml-4 font-normal text-xs rounded mt-6 shadow-md h-12 w-11/12'></input>
                </div>
                <section className='flex w-full ml-8 mt-10'>
                    <select className='h-12 w-6/12 pl-6 rounded shadow-md font-normal text-xs' onChange={(event) => {
                        const selectedRegion = event.target.value;
                        setRegion(selectedRegion);
                    }}>
                    <option value="" disabled selected hidden>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
            </select>
        </section>
                {region === "" ? <AllCountries /> : null}
                {region === "Africa"? <Africa/>:null}
                {region === "America"? <America/>:null}
                {region === "Asia"? <Asia/>:null}
                {region === "Europe"? <Europe/>:null}
                {region === "Oceania"? <Oceania/>:null}
            </div>




        </main>
    );
}

export default Home;