import React from 'react'
import Header from '../Header'

const SNavbar = ({username, image}) => {
  return (
    <div className='Snavbar1'>
        <div className='Sheader1'><Header title='ExamCell'/></div>
        <div className="Sspace1"></div>
        <div className="line1"></div>
        <div className="Sprofile1"><img src={image} alt="profile" />{username}</div>
    </div>
  )
}

export default SNavbar