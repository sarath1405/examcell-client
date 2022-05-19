import React from 'react'
import Navlinks2 from './Navlinks2'

const Navbar1 = ({active, links}) => {
  return (
    <div className='navbar1'>
        <div><Navlinks2 links={links} active={active}/></div>
    </div>
  )
}

export default Navbar1