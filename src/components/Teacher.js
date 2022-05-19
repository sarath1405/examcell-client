import React from 'react'
import Navbar from './Navbar'
import Tlogin from './Tlogin'

const Teacher = () => {
  return (
    <div className='home'>
        <Navbar active="Teacher" links={[
          ['Home', ''],
          ['Student', 'student'],
          ['Teacher', 'teacher'],
          ['About', 'about']
        ]}/>
        <div className="container">
          <div className="right">
            <h1>Teacher Login</h1>
            <Tlogin/>
          </div>
          <div className="left">
            <img src="/images/vector.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Teacher