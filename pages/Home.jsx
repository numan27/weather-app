import React from 'react';
import Header from './components/Navbar';
import Footer from './components/Footer';
import IMAGES from '@/assets/images';
import Image from 'next/image';
import AppLayout from './components/AppLayout';

const Home = ({ currentWeather, forecast }) => {
  return (
    <AppLayout>
      <div>

        <section className="lg:px-32 md:px-16 px-8">

          <div className="md:flex items-center justify-center">
            <div className="w-full md:w-1/2 ">
              <h1 className="text-black font-bold text-2xl md:text-4xl lg:text-5xl text-center md:text-left">
                Welcome to Weather 360
              </h1>
              <p className="my-5 md:text-xl text-lg  text-blueGray-200 text-justify md:text-left">
                Get ready to stay informed about the latest weather conditions and forecasts. Whether you need to plan your day, check the temperature, or prepare for outdoor activities, our app has you covered.
              </p>
              <button className='text-white primaryBtn md:w-48 w-full hover:animate-none md:animate-bounce' size="large">Register Today </button>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end mb-8 sm:mb-0">
              <Image
                src={IMAGES.MAIN}
                className="w-full md:w-9/12"
                alt="Home Background Img"
              />
            </div>
          </div>
        </section>

      </div>
    </AppLayout >
  );
};

export default Home;
