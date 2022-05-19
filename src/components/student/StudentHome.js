import React from 'react'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { decodeToken } from 'react-jwt'
import Snavbar from './Snavbar'
import Exams from '../exam/Exams'
import '../../studentLogin.css'

const StudentHome = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
        const authentication = async () => {
            const response = await fetch('https://examcell07.herokuapp.com/student/auth', {
                method : 'GET',
                headers : {
                    'x-access-token' : localStorage.getItem('token')
                }
            })

            const data = await response.json();
            if(data.status === 'error') {
              window.location.href = '/student';
            }
            else {
              setUsername(decodeToken(token).username);
            }
        }
        authentication();
    }
    else window.location.href = '/student';
  },[])

  const handleClick = () => {
    if(window.confirm('are you confirm to Logout?')) {
      localStorage.removeItem('token');
      navigate('/student')
    }
  }

  return (
    <div className='Scontainer'>
      <div><Snavbar active="Home" navlinks = {[
          ['Home', 'student/home'],
          ['Dashboard', 'student/dashboard'],
          ['Logout', '']
        ]} username={username} click={handleClick} image='/images/profile.png'/></div>
        <div className="ShomeBox">
        <div className="left1">
            <h2>Exams</h2>
            <Exams username={username}/>
          </div>
        </div>
    </div>
  )
}

export default StudentHome