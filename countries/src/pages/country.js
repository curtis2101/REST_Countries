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
    const[isPending,setIsPending] = useState(true);
    const[error,setError] = useState(null);
    const [code,setCode] = useState(null);
    const [borders,setBorders] = useState(null);

    const goBack = () => {
        navigate('/')
    }
    
    
    useEffect( () => {
        setIsPending(true)
        fetch(`https://restcountries.com/v3.1/name/${country}`).then
        (res => {return res.json();}).then
        (data => {setDetails(data);
            setString(Object.keys(data[0].currencies || {}).toString());
            setLang(Object.values(data[0].languages || {}));
            setNative(Object.keys(data[0].name.nativeName || {}));
            setBorders(Object.values(data[0].borders || {}).toString());
            setIsPending(false)
        })
    }, [country])

        useEffect( () => {
        setIsPending(true)
        fetch(`https://restcountries.com/v3.1/alpha?codes=${borders}`)
        .then(res => {
            if(!res.ok){
                throw Error('couldnt fetch data');
            }
            return res.json();
        })
        .then
        (data => {
            setCode(data);
            if(!code === null)
            console.log('hi')
            setIsPending(false)
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
    },[borders])

    const borderCountry = country => {
        setCountry(country)
    }
    console.log(string)

    return (
        <main className='h-screen flex flex-col items-center w-full overflow-x-hidden bg-verylightgrey dark:bg-verydarkblue overflow-scroll'>
            <div className='flex flex-col items-center w-full'>
                <Header/>
                <section className='flex justify-items-start w-full'>
                    <button onClick={goBack} className='md:w-32 md:h-10 dark:bg-darkblue dark:text-white dark:border-darkblue border-2 ml-7 mt-10 mb-16 md:border rounded-lg shadow-md hover:shadow-inner cursor-pointer w-3/12 flex flex-row items-center justify-center text-sm font-light'><span className='mr-2 text-lg'><BsArrowLeft/></span>Back</button>
                </section>
                {/* {error && <div>error</div>} */}
                {isPending && <button disabled type="button" className="mt-10 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-darkblue dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
    <svg role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Loading...
</button>}
                {details && details.map((data,index) => 
                <div className='w-full flex flex-col lg:flex-row items-center' key={index}>
                    <img className='rounded mb-11 md:mt-16 lg:ml-20 lg:mr-32 w-10/12 md:w-10/12 md:h-80 lg:h-5/6 lg:w-4/12 h-48' alt={data.name.common} src={data.flags.png}/>
                    <section className='flex flex-col w-full dark:text-white md:mt-16 md:items-center lg:items-start lg:ml-0'>
                        <h1 className='font-extrabold text-xl md:text-2xl ml-7 md:mb-8 lg:mb-0'>{data.name.common}</h1>
                        <div className='md:flex md:flex-row'>
                            <div className='md:flex md:flex-col md:mr-24 lg:mr-0'>
                                {/* <p className='ml-7 mt-4 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Native Name: </span>{data.name.nativeName[native[0]].common}</p> */}
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Population: </span>{data.population}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Region: </span>{data.region}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Sub Region: </span>{data.subregion}</p>
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Capital: </span>{data.capital}</p>
                            </div>
                            <div className='md:flex md:flex-col md:ml-3 lg:ml-36'>
                                <p className='ml-7 mt-8 md:mt-4 md:text-lg text-sm font-light'><span className='text-sm md:text-lg font-semibold'>Top Level Domain: </span>{data.tld}</p>
                                {/* <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Currencies: </span>{data.currencies[string].name}</p> */}
                                <p className='ml-7 mt-2 text-sm md:text-lg font-light'><span className='text-sm md:text-lg font-semibold'>Languages: </span>{lang.map((data) => <span className='mr-2'>{data}</span>)}</p>
                            </div>
                        </div>
                        {details[0].borders ? 
                        <div className='md:flex md:flex-row md:mt-16 md:justify-center lg:justify-start md:w-full md:flex-wrap md:gap-1 '>
                            <h2 className='font-semibold text-base ml-7 md:ml-3 lg:ml-7 mt-8 md:mt-0 md:text-lg'>Border Countries:</h2>
                            {code ? code.map((data,index) => 
                            <button key={index} onClick={e => borderCountry(e.target.innerHTML)} className='mb-14 border-2 md:mt-0 dark:bg-darkblue dark:border-darkblue shadow-md rounded cursor-pointer w-24 min-w-fit  pr-2 pl-2 md:h-7 h-6 ml-7 mr-2 mt-4 text-xs md:text-base font-light'>{data.name.common}</button>
                        ):null}</div> : null} 
                    </section>
                </div>)}
            </div>
        </main>
        
    );
}

export default Country;