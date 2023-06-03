import React from 'react'
import Header from './Navbar'
import Footer from './Footer'

const AppLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <main className='lg:px-40 md:px-32 sm:px-16 px-8'>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout