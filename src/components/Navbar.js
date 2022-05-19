import React from 'react'
import Header from './Header'
import Navlinks from './Navlinks'

const Navbar = ({active, links}) => {
  return (
    <div className='navbar'>
        <div className='header'><Header title='ExamCell'/></div>
        <div className="space"></div>
        <div className='navlinks'><Navlinks links={links} active={active}/></div>
    </div>
  )
}

export default Navbar