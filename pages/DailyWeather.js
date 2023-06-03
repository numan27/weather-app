import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import AppLayout from './components/AppLayout';

const API_KEY = '6339093bde1e454e96324306230306';
const CITY_NAME = 'Lahore';

// Defining states
const WeatherData = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetching data
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY_NAME}&aqi=no`;

            try {
                const response = await axios.get(url);
                setWeatherData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Error fetching weather data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <div>Fetching weather data...</div>;
    }

    if (error) {
        return (
            <div>
                {error}
                <Link href="/Home">Go back</Link>
            </div>
        );
    }

    if (!weatherData) {
        return null;
    }
    return (

        <AppLayout>
            <div className='px-20 text-xl'>
                <h2 className='text-2xl mb-3'>Weather Data for <span className='font-semibold'>{CITY_NAME}</span> </h2>
                <p>Temperature: <span className='font-semibold'> {weatherData.current.temp_c}°C</span></p>
                <p className='mb-4'>Weather: <span className='font-semibold'>{weatherData.current.condition.text}</span></p>
                <Link className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded' href="/">  Go back</Link>
            </div>
        </AppLayout>
    );
};

export default WeatherData;
