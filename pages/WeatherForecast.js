import React, { useEffect, useState } from 'react';
import AppLayout from './components/AppLayout';
import axios from 'axios';
import { FiSun, FiCloud, FiThermometer, FiWind } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation } from 'swiper';
import Link from 'next/link';

SwiperCore.use([Navigation]);

const API_KEY = '6339093bde1e454e96324306230306';
const CITY_NAME = 'Lahore';

const WeatherForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY_NAME}&days=7&aqi=no`;

            try {
                const response = await axios.get(url);
                setForecastData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Error fetching forecast data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center">Fetching forecast data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!forecastData) {
        return null;
    }

    const { forecastday } = forecastData.forecast;

    return (
        <AppLayout>
            <div className="mt-4">
                <h3 className="text-2xl font-semibold mb-4">7-Day Forecast</h3>
                <div className="mx-4 ">
                    <Swiper className=''
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {forecastday.map((day) => (
                            <SwiperSlide key={day.date} className="">
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <p className="text-gray-600 font-medium mb-2">
                                        {format(parseISO(day.date), 'EEEE, MMMM d')}
                                    </p>
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center mr-8">
                                            <FiSun className="text-yellow-500 mr-2" />
                                            <span>{day.day.maxtemp_c}°C</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiCloud className="text-blue-500 mr-2" />
                                            <span>{day.day.mintemp_c}°C</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <FiThermometer className="text-red-500 mr-2" />
                                        <span>Max Temperature: {day.day.maxtemp_c}°C</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <FiThermometer className="text-blue-500 mr-2" />
                                        <span>Min Temperature: {day.day.mintemp_c}°C</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiWind className="text-gray-500 mr-2" />
                                        <span>Wind Speed: {day.day.maxwind_kph} km/h</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="mt-4">
                    <Link className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded" href="/">
                        Go back
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
};

export default WeatherForecast;
