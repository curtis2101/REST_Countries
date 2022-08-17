import React, {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../components/header.js'

const Country = () => {
    const {countryName} = useParams();
    const [country,setCountry] = useState(countryName);
    const [details,setDetails] = useState(null);

    useEffect( () => {
        async function fetchData(){
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        const data = await res.json()
        setDetails(data)
        }
        fetchData() 
    }, [country])

    
    
    return (
        <main>
            <div>
                <Header/>
                {details && details.map((data,index) => 
                <h1 key={index}>{data.name.common}</h1>)}
            </div>
        </main>
        
    );
}

export default Country;