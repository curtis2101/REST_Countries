import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'
import React, {useState,useEffect} from 'react'
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [countries, setCountries] = useState([]);
    const [showh1,setShowh1] = useState(true);
    const navigate = useNavigate();
    
    
    useEffect( () => {
        async function fetchData(){
        const res = await fetch('https://restcountries.com/v2/all')
        const data = await res.json()
        setCountries(data)}
        fetchData()
    }, [])

    const filterByRegion = async region => {
        if(region === 'Africa'|| region ==='America' || region === 'Asia' || region === 'Europe' || region === 'Oceania') {
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await res.json()
        setCountries(data)
        setShowh1(false)}
        else if (region ==='all') {
                const res = await fetch('https://restcountries.com/v2/all')
                const data = await res.json()
                setShowh1(true)
                setCountries(data)}
            
        
    }
    const searchCountry = async input => {
        if(input.length < 3 && input === '') return
        const res = await fetch(`https://restcountries.com/v3.1/name/${input}`)
        const data = await res.json()
        setCountries(data)
        setShowh1(false)
    }
  
    
    return ( 
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey dark:bg-verydarkblue overflow-scroll"'>
            <div className='flex flex-col items-center w-full'>
                <Header />
                <div className='relative flex flex-col md:flex-row text-gray-400 dark:text-white w-full'>
                    <IconContext.Provider value={{className:'absolute top-9 left-12 md:top-16 md:left-28 text-lg text-gray-400 dark:text-white'  }}><AiOutlineSearch/></IconContext.Provider>
                    <input type='text' placeholder='Search for a country...' className='dark:bg-darkblue dark:placeholder-white pr-3 pl-20 py-2 ml-4 md:ml-20 font-normal text-xs md:text-sm rounded mt-6 md:mt-12 shadow-md h-12 w-11/12 md:min-w-1/3' onChange={ e => searchCountry(e.target.value)}/>
                    <section className='flex w-full md:justify-end md:mr-20 ml-4 mt-10 md:mt-12 '>
                        <select className=' cursor-pointer dark:bg-darkblue dark:text-white h-12 w-6/12 md:w-48 pl-6 rounded shadow-md font-normal text-xs md:text-sm' onChange={ e => filterByRegion(e.target.value)}>
                            <option value='all' selected>Filter by Region</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </section>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-20 md:justify-center md:flex-wrap w-full mt-10">
        {countries.map((country,index) => 
            <section key={index} className='mb-10 flex flex-col items-center'>
                <div className='rounded-lg bg-white dark:bg-darkblue w-9/12 md:w-72 min-h-80 max-h-92 shadow-md'>
                    <img className="rounded-t-lg w-full h-36"src={country.flags.png} alt="flag"/>
                    {showh1 ?<h1 onClick={() => navigate(`/country/${country.name}`)} className="hover:opacity-60 cursor-pointer mt-4 ml-4 dark:text-white font-extrabold text-lg">{country.name}<span className="text-xs"><br/>(More info)</span></h1>:<h1 onClick={() => navigate(`/country/${country.name.common}`)} className="hover:opacity-60 cursor-pointer dark:text-white mt-4 ml-4 font-extrabold text-lg">{country.name.common}<span className="text-xs"><br/>(More info)</span></h1>}
                    <h2 className="dark:text-white mt-4 ml-4 font-light text-sm"><span className="font-semibold">Population:</span> {country.population}</h2>
                    <h2 className="dark:text-white mt-4 ml-4 font-light text-sm"><span className="font-semibold">Region:</span> {country.region}</h2>
                    <h2 className="dark:text-white mt-4 ml-4 font-light text-sm mb-11"><span className="font-semibold">Capital:</span> {country.capital}</h2>
                </div>
            </section>
        )}


        </div>




        </main>
    );
}

export default Home;