import React from 'react'
import Header from '../Header'
import Navlinks from '../Navlinks'

const SNavbar = ({active, navlinks, username, click, image, click1}) => {
  return (
    <div className='Snavbar'>
        <div className='Sheader'><Header title='ExamCell'/></div>
        <div className="Sspace"></div>
        <div className='Snavlinks'><Navlinks links={navlinks} active={active} click={click} click1={click1}/></div>
        <div className="line"></div>
        <div className="Sprofile"><img src={image} alt="pr" />{username}</div>
    </div>
  )
}

export default SNavbar