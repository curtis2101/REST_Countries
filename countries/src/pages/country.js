import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/header.js'
import{BsArrowLeft} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

const Country = () => {
    const navigate = useNavigate();
    const {countryName} = useParams();
    const [country,setCountry] = useState(countryName);
    const [details,setDetails] = useState(null);
    const [string,setString] = useState(null);
    const [lang , setLang] = useState(null);
    const [native, setNative] = useState(null);


    const goBack = () => {
        navigate('/')
    }
    

    
    useEffect( () => {
    
        fetch(`https://restcountries.com/v3.1/name/${country}`).then
        ( res => {return res.json();}).then
        (data => {setDetails(data);
            setString(Object.keys(data[0].currencies || {}).toString());
            setLang(Object.keys(data[0].languages || {}));
            setNative(Object.keys(data[0].name.nativeName || {}));
        })
    }, [country])
        
    return (
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey dark:bg-verydarkblue overflow-scroll'>
            <div className='flex flex-col items-center w-full'>
                <Header/>
                <section className='flex justify-items-start w-full'>
                    <button onClick={goBack} className='md:w-32 md:h-10 dark:bg-darkblue dark:text-white dark:border-darkblue border-2 ml-7 mt-10 mb-16 md:border rounded-lg shadow-md hover:shadow-inner cursor-pointer w-3/12 flex flex-row items-center justify-center text-sm font-light'><span className='mr-2 text-lg'><BsArrowLeft/></span>Back</button>
                </section>
                {details && details.map((data,index) => 
                <div className='w-full flex flex-col lg:flex-row items-center' key={index}>
                    <img className='rounded mb-11 md:mt-16 lg:ml-20 lg:mr-32 w-10/12 md:w-10/12 md:h-80 lg:h-5/6 lg:w-4/12 h-48' alt={data.name.common} src={data.flags.png}/>
                    <section className='flex flex-col w-full dark:text-white md:mt-16 md:items-center lg:items-start lg:ml-0'>
                        <h1 className='font-extrabold text-xl md:text-2xl ml-7 md:mb-8 lg:mb-0'>{data.name.common}</h1>
                        <div className='md:flex md:flex-row'>
                            <div className='md:flex md:flex-col md:mr-24 lg:mr-0'>
                                <p className='ml-7 mt-4 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Native Name: </span>{data.name.nativeName[native[0]].common}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Population: </span>{data.population}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Region: </span>{data.region}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Sub Region: </span>{data.subregion}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Capital: </span>{data.capital}</p>
                            </div>
                            <div className='md:flex md:flex-col md:ml-3 lg:ml-36'>
                                <p className='ml-7 mt-8 md:mt-4 md:text-lg text-sm font-light'><span className='text-sm md:text-lg font-semibold'>Top Level Domain: </span>{data.tld}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Currencies: </span>{data.currencies[string].name}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Languages: </span>{data.languages[lang[0]]}</p>
                            </div>
                        </div>
                        <div className='md:flex md:flex-row md:mt-16 md:justify-items-start md:w-8/12'>
                            <h2 className='font-semibold text-base ml-7 md:ml-3 lg:ml-7 mt-8 md:mt-0 md:text-lg'>Border Countries:</h2>
                            <button className='mb-14 border-2 md:mt-0 dark:bg-darkblue dark:border-darkblue shadow-md rounded cursor-pointer w-24 md:w-28 md:h-7 h-6 ml-7 mt-4 text-xs md:text-base font-light'>{data.borders}</button>
                        </div>
                    </section>
                </div>)}
            </div>
        </main>
        
    );
}

export default Country;