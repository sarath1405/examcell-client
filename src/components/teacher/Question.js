import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Snavbar from '../student/Snavbar'
import ExamQues from './ExamQues'
import CreateQues from './CreateQues'
import '../../studentLogin.css'

const Question = () => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        const authentication = async () => {
            const response = await fetch('https://examcell07.herokuapp.com/teacher/auth', {
                method : 'GET',
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            })

            const data = await response.json();
            if(data.status === 'error') {
              window.location.href = '/teacher'
            }
            else {
              setUsername(decodeToken(token).username);
            }
        }
        authentication();
    }
    else window.location.href = '/teacher';
  },[])

  const handleClick = () => {
    if(window.confirm('are you confirm to Logout?')) {
      localStorage.removeItem('token');
      navigate('/teacher')
    }
  }

  const profileClick = () => {
    navigate('/teacher/profile');
  }

  return (
    <div className='Scontainer'>
      <div><Snavbar active="Home" navlinks = {[
          ['Home', 'teacher/home'],
          ['Report', 'teacher/reports'],
          ['Logout', '']
        ]} username={username} click={handleClick} profile={profileClick} image='/images/profile1.png'/></div>
        <div className="ShomeBox">
          <div className="left1">
            <h2>Questions</h2>
            <ExamQues exam={location.pathname} username = {username}/>
          </div>
          <div className="right2">
            <CreateQues exam = {location.pathname}/>
          </div>
        </div>
    </div>
  )
}

export default Question