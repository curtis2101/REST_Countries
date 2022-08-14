import React from 'react';
import useFetch from '../useFetch.js'

const America = () => {
    const {data,isPending, error} = useFetch('https://restcountries.com/v2/region/americas');
    return ( 
        <>
        <div className="flex flex-col w-full mt-10">
        {error &&<div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {data && data.map(data => (
            <section className='mb-10 flex flex-col items-center'>
                <div className='rounded-lg bg-white w-9/12 h-80 shadow-md'>
                    <img className="rounded-t-lg w-full h-36"src={data.flags.png} alt="flag"/>
                    <h1 className="mt-4 ml-4 font-extrabold text-lg">{data.name}</h1>
                    <h2 className="mt-4 ml-4 font-light text-sm"><span className="font-semibold">Population:</span> {data.population}</h2>
                    <h2 className="mt-4 ml-4 font-light text-sm"><span className="font-semibold">Region:</span> {data.region}</h2>
                    <h2 className="mt-4 ml-4 font-light text-sm"><span className="font-semibold">Capital:</span> {data.capital}</h2>
                </div>
            </section>
        ))}


        </div>
    </>
     );
}
 
export default America;