import Header from '../components/header.js'
import {AiOutlineSearch} from 'react-icons/ai'
import React, {useState,useEffect} from 'react'
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [countries, setCountries] = useState([]);
    const [showh1,setShowh1] = useState(true);
    const[isPending,setIsPending] = useState(true);
    const[error,setError] = useState(null);
    const navigate = useNavigate();
    
    
    useEffect( () => {
        fetch('https://restcountries.com/v2/all')
        .then(res => {
            if(!res.ok){
                throw Error('couldnt fetch data');
            }
            return res.json();
        })
        .then(data =>{
            setCountries(data)
            setIsPending(false);
            setError(null); })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
            
    }, [])

    const filterByRegion = async region => {
        if(region === 'Africa'|| region ==='America' || region === 'Asia' || region === 'Europe' || region === 'Oceania') {
        setIsPending(true);
        const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
        const data = await res.json()
        setCountries(data)
        setIsPending(false)
        setShowh1(false)}
        else if (region ==='all') {
            setIsPending(true)
                const res = await fetch('https://restcountries.com/v2/all')
                const data = await res.json()
                setShowh1(true)
                setCountries(data)
                setIsPending(false)}
            
        
    }
    const searchCountry = input => {
        if(input.length < 3 && input === '') return
        fetch(`https://restcountries.com/v3.1/name/${input}`)
        .then(res => {
            if(!res.ok){
                throw Error('Invalid country name. Please try again');
            }
            return res.json();
        })
        .then(data =>{
        setCountries(data)
        setIsPending(false);
        setError(null);
        setShowh1(false)
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
        return {countries, isPending,error}
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
            {error &&<div className='flex flex-col mt-4 text-lg text-red-500'>{error}</div>}
            {isPending && <button disabled type="button" class="mt-10 py-2.5 px-5 mr-2 text-sm font-medium dark:bg-white text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
    <svg role="status" class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Loading...
</button>}
            <div className="flex flex-col md:flex-row md:gap-20 md:justify-center md:flex-wrap w-full mt-10">
        {countries && countries.map((country,index) => 
            <section key={index} className='mb-10 flex flex-col items-center'>
                <div className='rounded-lg bg-white dark:bg-darkblue w-9/12 md:w-72 min-h-80 max-h-92 shadow-md'>
                    <img className="rounded-t-lg w-full h-36"src={country.flags.png} alt="flag"/>
                    {showh1 ?<h1 onClick={() => navigate(`/country/${country.name}`)} className="hover:opacity-60 cursor-pointer mt-4 ml-4 dark:text-white font-extrabold text-lg">{country.name}<span className="text-xs"><br/>(More info)</span></h1>:<h1 onClick={() => navigate(`/country/${country.name.common}`)} className="hover:opacity-60 cursor-pointer dark:text-white mt-4 ml-4 font-extrabold text-lg">{country.name.official}<span className="text-xs"><br/>(More info)</span></h1>}
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