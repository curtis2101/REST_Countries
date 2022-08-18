import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/header.js'
import{BsArrowLeft} from 'react-icons/bs'

const Country = () => {
    const {countryName} = useParams();
    const [country,setCountry] = useState(countryName);
    const [details,setDetails] = useState(null);
    const [string,setString] = useState(null);
    const [lang , setLang] = useState(null);


    
    

    
    useEffect( () => {
    
        fetch(`https://restcountries.com/v3.1/name/${country}`).then
        ( res => {return res.json();}).then
        (data => {setDetails(data);
            setString(Object.keys(data[0].currencies || {}).toString());
            setLang(Object.keys(data[0].languages || {}).toString());
        })
    }, [country])
        

    return (
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey dark:bg-verydarkblue overflow-scroll'>
            <div className='flex flex-col items-center w-full'>
                <Header/>
                <section className='flex justify-items-start w-full'>
                    <button className='border-2 ml-7 mt-10 mb-16 rounded shadow-md hover:shadow-inner cursor-pointer w-3/12 flex flex-row items-center justify-center text-sm font-light'><span className='mr-2 text-lg'><BsArrowLeft/></span>Back</button>
                </section>
                {details && string && lang && details.map((data,index) => 
                <div className='w-full flex flex-col items-center' key={index}>
                    <img className='rounded mb-11 w-10/12 h-6/6' alt={data.name.common} src={data.flags.png}/>
                    <section className='flex flex-col w-full '>
                        <h1 className='font-extrabold text-xl ml-7'>{data.name.common}</h1>
                        <p className='ml-7 mt-4 text-sm font-light'><span className='text-sm font-semibold'>Official Name: </span>{data.name.official}</p>
                        <p className='ml-7 mt-2 text-sm font-light'><span className='text-sm font-semibold'>Population: </span>{data.population}</p>
                        <p className='ml-7 mt-2 text-sm font-light'><span className='text-sm font-semibold'>Region: </span>{data.region}</p>
                        <p className='ml-7 mt-2 text-sm font-light'><span className='text-sm font-semibold'>Sub Region: </span>{data.subregion}</p>
                        <p className='ml-7 mt-2 text-sm font-light'><span className='text-sm font-semibold'>Capital: </span>{data.capital}</p>
                        <p className='ml-7 mt-8 text-sm font-light'><span className='text-sm font-semibold'>Top Level Domain: </span>{data.tld}</p>
                        <p className='ml-7 mt-2 text-sm font-light'><span className='text-sm font-semibold'>Currencies: </span>{data.currencies[string].name}</p>
                        <p className='ml-7 mt-2 text-sm font-light'><span className='text-sm font-semibold'>Languages: </span>{data.languages[lang]}</p>
                        <h2 className='font-semibold text-base ml-7 mt-8'>Border Countries:</h2>
                        <button className='border-2 shadow-md rounded cursor-pointer w-24 h-6 ml-7 mt-4 text-xs font-light'>{data.borders}</button>

                    </section>
                </div>)}
            </div>
        </main>
        
    );
}

export default Country;