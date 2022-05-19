import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router'

const Home = () => {

  const navigate = useNavigate();

  const linkToStudent = () => {
    navigate('/student')
  }

  const linkToTeacher = () => {
    navigate('/teacher')
  }

  return (
    <div className='home'>
        <Navbar active='Home' links={[
          ['Home', ''],
          ['Student', 'student'],
          ['Teacher', 'teacher'],
          ['About', 'about']
        ]}/>
        <div className="container">
          <div className="right">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptates voluptatum culpa? Modi aperiam cupiditate molestiae quam tempora, autem sit praesentium, quo assumenda recusandae nemo rerum, voluptatem sequi odit architecto obcaecati provident aspernatur pariatur et ab vitae? Dolorum nemo voluptas, saepe hic nihil explicabo iste quam quas, a dolores officiis, ducimus quaerat voluptatem sit vero fugit atque ipsam neque. Quos doloribus at itaque deserunt, omnis sapiente eum provident voluptas nulla! <br />
            <span><button onClick={linkToStudent}>Student</button> <button onClick={linkToTeacher}>Teacher</button></span>
          </div>
          <div className="left">
            <img src="/images/vector.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default Home