import React from 'react'
import Navbar from './Navbar'
import Slogin from './Slogin'

const Student = () => {
  return (
    <div className='home'>
        <Navbar active="Student" links={[
          ['Home', ''],
          ['Student', 'student'],
          ['Teacher', 'teacher'],
          ['About', 'about']
        ]}/>
        <div className="container">
          <div className="right">
            <h1>Student Login</h1>
            <Slogin/>
          </div>
          <div className="left">
            <img src="/images/vector.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Student