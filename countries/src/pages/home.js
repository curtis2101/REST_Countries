import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'
import React, {useState,useEffect} from 'react'
import { IconContext } from "react-icons";


const Home = () => {
    const [countries, setCountries] = useState([]);
    const [showh1,setShowh1] = useState(true);
    
    
    useEffect( () => {
        async function fetchData(){
        const res = await fetch('https://restcountries.com/v2/all')
        const data = await res.json()
        await setCountries(data)}
        fetchData()
    }, [])

    const filterByRegion = async region => {
        if(region === '') return
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await res.json()
        await setCountries(data)
        setShowh1(false)
        
    }

    const searchCountry = async input => {
        if(input.length < 3 || input === '') return
        const res = await fetch(`https://restcountries.com/v3.1/name/${input}`)
        const data = await res.json()
        await setCountries(data)
    }

    return ( 
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey dark:bg-verydarkblue overflow-scroll"'>
            <div className='flex flex-col items-center w-full'>
                <Header />
                <div className='relative flex flex-col md:flex-row text-gray-400 dark:text-white w-full'>
                    <IconContext.Provider value={{className:'absolute top-9 left-12 md:top-16 md:left-28 text-lg text-gray-400 dark:text-white'  }}><AiOutlineSearch/></IconContext.Provider>
                    <input type='text' placeholder='Search for a country...' className='dark:bg-darkblue dark:placeholder-white pr-3 pl-20 py-2 ml-4 md:ml-20 font-normal text-xs md:text-sm rounded mt-6 md:mt-12 shadow-md h-12 w-11/12 md:min-w-1/3' onChange={ e => searchCountry(e.target.value)}/>
                    <section className='flex w-full md:justify-end md:mr-20 ml-4 mt-10 md:mt-12'>
                        <select className='dark:bg-darkblue dark:text-white h-12 w-6/12 md:w-48 pl-6 rounded shadow-md font-normal text-xs md:text-sm' onChange={ e => filterByRegion(e.target.value)}>
                            <option selected>Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </section>
                </div>
            </div>
            <div className="flex flex-col w-full mt-10">
        {countries.map((country,index) => (
            <section key={index} className='mb-10 flex flex-col items-center'>
                <div className='rounded-lg bg-white dark:bg-darkblue w-9/12 h-80 shadow-md'>
                    <img className="rounded-t-lg w-full h-36"src={country.flags.png} alt="flag"/>
                    {showh1 ?<h1 className="mt-4 ml-4 dark:text-white font-extrabold text-lg">{country.name}</h1>:<h1 className=" dark:text-white mt-4 ml-4 font-extrabold text-lg">{country.name.common}</h1>}
                    <h2 className="dark:text-white mt-4 ml-4 font-light text-sm"><span className="font-semibold">Population:</span> {country.population}</h2>
                    <h2 className="dark:text-white mt-4 ml-4 font-light text-sm"><span className="font-semibold">Region:</span> {country.region}</h2>
                    <h2 className="dark:text-white mt-4 ml-4 font-light text-sm"><span className="font-semibold">Capital:</span> {country.capital}</h2>
                </div>
            </section>
        ))}


        </div>




        </main>
    );
}

export default Home;