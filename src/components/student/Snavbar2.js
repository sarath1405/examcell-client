import React from 'react'
import Header from '../Header'
import Navlinks from '../Navlinks'
import Timer from '../exam/Timer'

const SNavbar2 = ({navlinks, username, click, click1, hours, minutes, seconds, image}) => {
  return (
    <div className='Snavbar'>
        <div className='Sheader'><Header title='ExamCell'/></div>
        <div className="Sspace">
        {(!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds))?<Timer hours={hours} minutes={minutes} seconds={seconds} />:''}
        </div>
        <div className='Snavlinks'><Navlinks links={navlinks} click={click} click1={click1}/></div>
        <div className="line"></div>
        <div className="Sprofile"><img src={image} alt="pr" />{username}</div>
    </div>
  )
}

export default SNavbar2