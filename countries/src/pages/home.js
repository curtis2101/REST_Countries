import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'
import React, {useState,useEffect} from 'react'


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
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey overflow-scroll"'>
            <div className='flex flex-col items-center w-full'>
                <Header />
                <div className='relative flex text-gray-400 w-full'>
                    <AiOutlineSearch className='absolute left-12 bottom-4 text-xl text-gray-400'/>
                    <input type='text' placeholder='Search for a country...' className='pr-3 pl-20 py-2 ml-4 font-normal text-xs rounded mt-6 shadow-md h-12 w-11/12' onChange={ e => searchCountry(e.target.value)}/>
                </div>
                <section className='flex w-full ml-8 mt-10'>
                    <select className='h-12 w-6/12 pl-6 rounded shadow-md font-normal text-xs' onChange={ e => filterByRegion(e.target.value)}>
                    <option value="" disabled selected hidden>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="America">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
            </select>
        </section>
            </div>
            <div className="flex flex-col w-full mt-10">
        {countries.map((country,index) => (
            <section key={index} className='mb-10 flex flex-col items-center'>
                <div className='rounded-lg bg-white w-9/12 h-80 shadow-md'>
                    <img className="rounded-t-lg w-full h-36"src={country.flags.png} alt="flag"/>
                    {showh1 ?<h1 className="mt-4 ml-4 font-extrabold text-lg">{country.name}</h1>:<h1 className="mt-4 ml-4 font-extrabold text-lg">{country.name.common}</h1>}
                    <h2 className="mt-4 ml-4 font-light text-sm"><span className="font-semibold">Population:</span> {country.population}</h2>
                    <h2 className="mt-4 ml-4 font-light text-sm"><span className="font-semibold">Region:</span> {country.region}</h2>
                    <h2 className="mt-4 ml-4 font-light text-sm"><span className="font-semibold">Capital:</span> {country.capital}</h2>
                </div>
            </section>
        ))}


        </div>




        </main>
    );
}

export default Home;